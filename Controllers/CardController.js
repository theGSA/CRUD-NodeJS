
const Common = require('../global/common');
const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');
const db = require('../database/db');

const app = express();
class CardController{

    static routeName = "Card";

    static GetAllRows(CallBackFunc)
    {
        Common.GetFromTableById('Clan', 0, (err, row)=>{
            const rowClan = row;
            Common.GetFromTableById('Nivel', 0, (err, row)=>{
                const rowNivel = row;
                Common.GetFromTableById('Aldeia', 0, (err, row)=>{
                    const rowAldeia = row;
                    CallBackFunc({rowClan, rowAldeia, rowNivel});
                })
            })
        });
    }

    index(req, res){
        app.locals.Rota = CardController.routeName;
        
        Common.GetFromTableById(CardController.routeName, req.params.id, (err, row) =>
        {
            const Card = row;
            CardController.GetAllRows((_row)=>{
                Common.ResponseToPage( "Card",err, res, {Card, rowClan:_row.rowClan, rowAldeia: _row.rowAldeia, rowNivel: _row.rowNivel});
            })
        });
    }

    apiGet(req, res){
        Common.GetRowsByApi(CardController.routeName,req.params.id, (_res)=>{
            res.send(_res);
        })
    }

    insert(req, res){
        const {Id, Nome, Descricao, IdClan, IdNivel, IdAldeia, NomeImagem} = req.body;

            const Imagem = (req.files && req.files.Imagem) ? req.files.Imagem.data : null;
            const imgType = (req.files && req.files.Imagem) ? req.files.Imagem.mimetype : null;
            const imgNomeImagem = NomeImagem;
        
            app.locals.Rota = "Card";
            if(typeof Id == 'undefined' || Id == 0){
        
                db.get(`SELECT IFNULL(MAX(ID), 0) + 1 MaxID FROM ${CardController.routeName}`, (err, row)=>{
                    if(err)
                    {
                        console.log(err.message);
                        app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
                        res.redirect(`/${CardController.routeName}`);
                    }
                    db.run(`INSERT INTO ${CardController.routeName} VALUES(?,?,?,?,?,?,?,?,?)`,[row.MaxID, Nome, Descricao, IdClan,IdNivel, IdAldeia, Imagem, imgType, imgNomeImagem],(err)=>{
                        if(err)
                        {
                            console.log(err.message);
                            res.send("erro ao inserir"); 
                        }
                        else{
        
                            //res.send("item inserido com sucesso!");
                            app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Card Inserido com sucesso!');
                            res.redirect(`/${CardController.routeName}`);
                        }
                    });
                });
            }
            else{
                console.log(`atualizando ${Id}`);
                db.run(`UPDATE ${CardController.routeName} SET ID=?, Nome=?, Descricao=?, IdClan=?, IdNivel=?, IdAldeia=?, Imagem=?, TipoImagem=?, NomeImagem=? WHERE ID=?`,[Id, Nome, Descricao, IdClan,IdNivel, IdAldeia, Imagem, imgType, imgNomeImagem, Id],(err)=>{
                    if(err)
                    {
                        console.log(err.message);
                        app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
                    }
                    else{
                        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, "Card alterado com sucesso");
                    }
                    res.redirect(`/${CardController.routeName}`);
                });
            }
        }

    delete(req, res){
        const {Id} = req.body;
        Common.DeleteItem(`${CardController.routeName}`, Id, (err, item)=>{
            if(err){
                console.log(err);
                app.locals.mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
            }
            else{
                app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Card <span class="text-info">${item.Nome}</span> deletado!`);
                res.redirect(`/${CardController.routeName}`);
            }
        })
    }
}

module.exports = new CardController();