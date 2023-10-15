
const Common = require('../global/common');
const db = require('../database/db');
const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');
const Nivel = require('../Model/NivelModel');

const app = express();

class NivelController{

    static routeName = "Nivel";

    async index(req, res){
        app.locals.Rota = NivelController.routeName;
        
        let mensagem = app.locals.mensagem;
        app.locals.mensagem = null;
        let obj = await Nivel.findAll();
        res.render(NivelController.routeName, { Mensagem: mensagem, [NivelController.routeName]: obj, rota: NivelController.routeName, layout:'Layout'});
    }

    async apiGet(req, res){
        const obj = await Nivel.findByPk(req.params?.id);
        res.send(obj);
    }

    async insert(req, res){
        app.locals.Rota = NivelController.routeName;
        console.log(req.body);

        const nivel = req.body;

        if(nivel?.Id == 0){
            nivel.Id = null;
            await Nivel.create(nivel)
        }
        else{
            await Nivel.update(nivel, {where: { Id:nivel.Id } });
        }
        let acao = (req.body.Id == 0) ? "inserido": "alterado";
        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Nivel <span class="text-info>" ${nivel.Nome} </span> ${acao} com sucesso!`);
        res.redirect(`/${NivelController.routeName}`);
    }
        
    async delete(req, res){
        const {Id} = req.body;
        console.log(`deletando ${Id}`);

        const obj = await Nivel.findOne({
            where: {Id: Id}
        })

        obj.destroy();
        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Nivel <span class="text-info">${obj.Nome}</span> deletado!`);
        res.redirect(`/${NivelController.routeName}`);
    }
}

module.exports = new NivelController();