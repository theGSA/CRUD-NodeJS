
const Common = require('../global/common');
const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');

const app = express();

class ClanController{

    static routeName = "Clan";

    index(req, res){
        app.locals.Rota = ClanController.routeName;
        
        Common.GetFromTableById(ClanController.routeName, req.params.id, (err, row) =>
        {
            let mensagem = app.locals.mensagem;
            app.locals.mensagem = null;
            if (err) {
                mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
            }
            res.render(ClanController.routeName, { Mensagem: mensagem, [ClanController.routeName]: row, rota: ClanController.routeName, layout:'Layout'});
        });
    }

    apiGet(req, res){
        Common.GetRowsByApi(ClanController.routeName,req.params.id, (_res)=>{
            res.send(_res);
        })
    }

    insert(req, res){
            app.locals.Rota = ClanController.routeName;
            Common.InsertInRouteWithImage(ClanController.routeName, req, (err)=>{
                if(err){
                    app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
                }
                else{
                    let acao = (req.body.Id == 0) ? "inserido": "alterado";
                    
                    app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Clan ${req.body.Nome} ${acao} com sucesso!`);
                }
                res.redirect(`/${ClanController.routeName}`);
            });
        }

    delete(req, res){
        const {Id} = req.body;
        Common.DeleteItem(`${ClanController.routeName}`, Id, (err, item)=>{
            if(err){
                console.log(err);
                app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
            }
            else{
                app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Clan <span class="text-info">${item.Nome}</span> deletado!`);
                res.redirect(`/${ClanController.routeName}`);
            }
        })
    }
}

module.exports = new ClanController();