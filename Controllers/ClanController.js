
const Common = require('../global/common');
const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');
const Clan = require('../Model/ClanModel');

const app = express();

class ClanController{

    static routeName = "Clan";
    
    async index(req, res){
        
        app.locals.Rota = ClanController.routeName;

        let mensagem = app.locals.mensagem;
        app.locals.mensagem = null;
        
        Clan.findAll()
        .then((row)=>{
            res.render(ClanController.routeName, { Mensagem: mensagem, [ClanController.routeName]: row, rota: ClanController.routeName});
        })
        .catch({

        });
    }

    async apiGet(req, res){
        var obj = await Clan.findByPk(req.params?.id);
        res.send(obj);
    }

    async insert(req, res){
        app.locals.Rota = ClanController.routeName;
        console.log(req.body);

        const clan = req.body;

        clan.Imagem = (req.files && req.files.Imagem) ? req.files.Imagem.data : null;
        clan.TipoImagem = (req.files && req.files.Imagem) ? req.files.Imagem.mimetype : null;
        
        if(clan?.Id == 0){
            clan.Id = null;
            await Clan.create(clan)
        }
        else{
            await Clan.update(clan, {where: { Id:clan.Id } });
        }
        let acao = (req.body.Id == 0) ? "inserido": "alterado";
        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Clan <span class="text-info>" ${clan.Nome} </span> ${acao} com sucesso!`);
        res.redirect(`/${ClanController.routeName}`);

    }

    async delete(req, res){
        const {Id} = req.body;
        console.log(`deletando ${Id}`);

        const obj = await Clan.findOne({
            where: {Id: Id}
        })

        obj.destroy();
        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Clan <span class="text-info">${obj.Nome}</span> deletado!`);
        res.redirect(`/${ClanController.routeName}`);
    }
}

module.exports = new ClanController();