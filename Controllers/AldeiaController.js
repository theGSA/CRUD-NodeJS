
const Common = require('../global/common');
const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');

const app = express();
class AldeiaController{

    static routeName = "Aldeia";

    index(req, res){
        app.locals.Rota = AldeiaController.routeName;
        
        Common.GetFromTableById(AldeiaController.routeName, req.params.id, (err, row) =>
        {
            let mensagem = app.locals.mensagem;
            app.locals.mensagem = null;
            if (err) {
                mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
            }
            res.render(AldeiaController.routeName, { Mensagem: mensagem, [AldeiaController.routeName]: row, rota: AldeiaController.routeName, layout:'Layout'});
        });
    }

    apiGet(req, res){
        Common.GetRowsByApi(AldeiaController.routeName,req.params.id, (_res)=>{
            res.send(_res);
        })
    }

    insert(req, res){
            app.locals.Rota = AldeiaController.routeName;
            Common.InsertInRouteWithImage(AldeiaController.routeName, req, (err)=>{
                if(err){
                    app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
                }
                else{
                    let acao = (req.body.Id == 0) ? "inserido": "alterado";
                    
                    app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Aldeia ${req.body.Nome} ${acao} com sucesso!`);
                }
                res.redirect(`/${AldeiaController.routeName}`);
            });
        }

    delete(req, res){
        const {Id} = req.body;
        Common.DeleteItem(`${AldeiaController.routeName}`, Id, (err, item)=>{
            if(err){
                console.log(err);
                app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
            }
            else{
                app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Nivel <span class="text-info">${item.Nome}</span> deletado!`);
                res.redirect(`/${AldeiaController.routeName}`);
            }
        })
    }
}

module.exports = new AldeiaController();