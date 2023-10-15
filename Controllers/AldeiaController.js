
const Common = require('../global/common');
const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');
const Aldeia = require('../Model/AldeiaModel');

const app = express();
class AldeiaController{

    static routeName = "Aldeia";

    async index(req, res){
        
        app.locals.Rota = AldeiaController.routeName;
        let mensagem = app.locals.mensagem;
        app.locals.mensagem = null;
        var row = await Aldeia.findAll();
        res.render(AldeiaController.routeName, { Mensagem: mensagem, [AldeiaController.routeName]: row, rota: AldeiaController.routeName, layout:'Layout'});
    }

    async apiGet(req, res){
        const obj = await Aldeia.findByPk(req.params?.id);
        res.send(obj);
    }

    async insert(req, res){
        app.locals.Rota = AldeiaController.routeName;
        console.log(req.body);

        const aldeia = req.body;

        aldeia.Imagem = (req.files && req.files.Imagem) ? req.files.Imagem.data : null;
        aldeia.imgType = (req.files && req.files.Imagem) ? req.files.Imagem.mimetype : null;
        
        if(aldeia?.Id == 0){
            aldeia.Id = null;
            await Aldeia.create(aldeia)
        }
        else{
            await Aldeia.update(aldeia, {where: { Id:aldeia.Id } });
        }
        let acao = (req.body.Id == 0) ? "inserido": "alterado";
        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Aldeia <span class="text-info">${aldeia.Nome} </span> ${acao} com sucesso!`);
        res.redirect(`/${AldeiaController.routeName}`);

    }

    async delete(req, res){
        const {Id} = req.body;
        console.log(`deletando ${Id}`);

        const obj = await Aldeia.findOne({
            where: {Id: Id}
        })

        obj.destroy();
        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Aldeia <span class="text-info">${obj.Nome}</span> deletado!`);
        res.redirect(`/${AldeiaController.routeName}`);
    }
}

module.exports = new AldeiaController();