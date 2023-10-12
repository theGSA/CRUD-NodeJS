
const Common = require('../global/common');
const db = require('../database/db');
const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');

const app = express();

class NivelController{

    static routeName = "Nivel";

    index(req, res){
        app.locals.Rota = NivelController.routeName;
        
        Common.GetFromTableById(NivelController.routeName, req.params.id, (err, row) =>
        {
            let mensagem = app.locals.mensagem;
            app.locals.mensagem = null;
            if (err) {
                mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
            }
            res.render(NivelController.routeName, { Mensagem: mensagem, [NivelController.routeName]: row, rota: NivelController.routeName, layout:'Layout'});
        });
    }

    apiGet(req, res){
        Common.GetRowsByApi(NivelController.routeName,req.params.id, (_res)=>{
            res.send(_res);
        })
    }

    insert(req, res){
            const {Id, Nome, Descricao} = req.body;

            app.locals.Rota = NivelController.routeName;
            if(Id == 0){
                console.log("Inserindo");
                db.get(`SELECT IFNULL(MAX(ID), 0) + 1 MaxID FROM ${NivelController.routeName}`, (err, row)=>{
                    if(err)
                    {
                        console.log(err.message);
                        app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err);
                        res.redirect(`/${NivelController.routeName}`);
                    }
                    db.run(`INSERT INTO ${NivelController.routeName} VALUES(?,?,?)`,[row.MaxID, Nome, Descricao],(err)=>{
                        if(err)
                        {
                            console.log(err.message);
                            app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err); 
                        }
                        //res.send("");
                        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Nivel ${Nome} inserido com sucesso!`);
                        res.redirect(`/${NivelController.routeName}`);
                    });
                });
            }
            else{
                console.log(`atualizando ${Id}`);
                db.run(`UPDATE ${NivelController.routeName} SET ID=?, Nome=?, Descricao=? WHERE ID=?`,[Id, Nome, Descricao, Id],(err)=>{
                    if(err)
                    {
                        console.log(err.message);
                        app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err); 
                    }
                    
                    app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Nivel ${Nome} atualizado com sucesso!`);
                    res.redirect(`/${NivelController.routeName}`); 
                });
            }
        }
        
    delete(req, res){
        const {Id} = req.body;
        Common.DeleteItem(`${NivelController.routeName}`, Id, (err, item)=>{
            if(err){
                console.log(err);
                app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
            }
            else{
                app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Nivel <span class="text-info">${item.Nome}</span> deletado!`);
                res.redirect(`/${NivelController.routeName}`);
            }
        })
    }
}

module.exports = new NivelController();