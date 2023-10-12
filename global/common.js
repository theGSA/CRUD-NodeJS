const {tipoMensagem, Mensagem} = require('../Model/Messagem')
const express = require('express');
const db = require('../database/db');

const app = express();

class Common{

    GetFromTableById(tablename, id, CallBackFunc) {
        console.log(`obtendo '${tablename}' ${id}`);
        var where = "";
        

        if (id > 0)
            where += `WHERE ID=${id}`;

        db.all(`SELECT * FROM ${tablename} ${where}`, (err, row) => {
            if (err) {
                console.log(err.message);
                CallBackFunc(err);
            }
            CallBackFunc(null, row);
        })
    }

    GetRowsByApi(tablename, id, CallBackFunc) {
        this.GetFromTableById(tablename, id, (err, row) => {
            err ?
                CallBackFunc(err) :
                CallBackFunc(row);
        });
    }

    InsertInRouteWithImage(tablename, req, CallBackFunc) {
        const { Id, Nome, Descricao, NomeImagem } = req.body;
        console.log(req.body);

        const Imagem = (req.files && req.files.Imagem) ? req.files.Imagem.data : null;
        const imgType = (req.files && req.files.Imagem) ? req.files.Imagem.mimetype : null;
        const imgNomeImagem = NomeImagem;


        console.log(imgNomeImagem);
        if (!Imagem)
            console.log('sem imagem');

        if (Id == 0) {
            console.log("Inserindo");
            db.get(`SELECT IFNULL(MAX(ID), 0) + 1 MaxID FROM ${tablename}`, (err, row) => {
                if (err) {
                    console.log(err.message);
                    CallBackFunc(err);
                }
                else {
                    db.run(`INSERT INTO ${tablename} VALUES(?,?,?,?,?,?)`, [row.MaxID, Nome, Descricao, Imagem, imgType, NomeImagem], (err) => {
                        if (err) {
                            console.log(err.message);
                            CallBackFunc(err);
                        }
                        CallBackFunc();
                    });
                }
            });
        }
        else {
            console.log(`atualizando ${Id}`);
            db.run(`UPDATE ${tablename} SET ID=?, Nome=?, Descricao=?, Imagem=?, TipoImagem=?, NomeImagem=? WHERE ID=?`, [Id, Nome, Descricao, Imagem, imgType, NomeImagem, Id],
                (err) => {
                    if (err) {
                        console.log(err.message);
                        CallBackFunc(err)
                    }
                    CallBackFunc();
                });
        }

    }

    DeleteItem(tablename, Id, CallBackFunc) {
        db.get(`SELECT * FROM ${tablename} WHERE ID=${Id}`, (err, row) => {
            if (err) {
                console.log(err.message);
                CallBackFunc(err);
            }
            else {
                if (!row) {
                    CallBackFunc({ message: `item ${Id} não existe` });
                }
                else {
                    console.log(`Deletando ${row.Nome}`);
                    db.run(`DELETE FROM ${tablename} WHERE ID=?`, Id, (err) => {
                        if (err) {
                            console.log(`Erro ao deletar ${tablename}`);
                            CallBackFunc(err.message);
                        }
                        CallBackFunc(null, row);
                    });
                }
            }
        })
    }

    ResponseToPage(page, err, res, row) {
        let mensagem = app.locals.mensagem;
        
        app.locals.mensagem = null;
        if (err) {
            mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
        }
        res.render(page, { Mensagem: mensagem, [page]: row, rota: page, layout:'Layout'});
    }

}

module.exports = new Common();
