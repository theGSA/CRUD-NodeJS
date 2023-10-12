
const Common = require('../global/common');

const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');

class HomeController{
    index(req, res){
        var app = express();
        app.locals.Rota = "Card";

        Common.GetFromTableById("ViewCard",req.params.id, (err, rowCard) =>
        {
            let mensagem = app.locals.mensagem;
            app.locals.mensagem = null;
            if (err) {
                mensagem = new Mensagem(tipoMensagem.ERRO, err.message);
            }
            res.render("Home", { Mensagem: mensagem, rowCard, rota: "Home", layout:'Layout'});
        });
    }
}

module.exports = new HomeController();