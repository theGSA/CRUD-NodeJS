
const Common = require('../global/common');
const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');
const Card = require('../Model/CardModel');
const Clan = require('../Model/ClanModel');
const Nivel = require('../Model/NivelModel');
const Aldeia = require('../Model/AldeiaModel');

const app = express();
class CardController{

    static routeName = "Card";

    async index(req, res){
        app.locals.Rota = CardController.routeName;
        
        let mensagem = app.locals.mensagem;
        app.locals.mensagem = null;

        let objCard = await Card.findAll();
        let rowClan = await Clan.findAll();
        let rowAldeia = await Aldeia.findAll();
        let rowNivel = await Nivel.findAll();

        res.render(CardController.routeName, { Mensagem: mensagem, [CardController.routeName]:  {Card: objCard, rowClan, rowAldeia, rowNivel}, rota: CardController.routeName});
    }

    async apiGet(req, res){ 
        const obj = await Card.findByPk(req.params.id);
        res.send(obj);
    }

    async insert(req, res){
        app.locals.Rota = CardController.routeName;
        console.log(req.body);

        const card = req.body;

        card.Imagem = (req.files && req.files.Imagem) ? req.files.Imagem.data : null;
        card.TipoImagem = (req.files && req.files.Imagem) ? req.files.Imagem.mimetype : null;
        
        if(card?.Id == 0){
            card.Id = null;
            await Card.create(card)
        }
        else{
            await Card.update(card, {where: { Id:card.Id } });
        }
        let acao = (req.body.Id == 0) ? "inserido": "alterado";
        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Card <span class="text-info" > ${card.Nome} </span> ${acao} com sucesso!`);
        res.redirect(`/${CardController.routeName}`);
    }

    async delete(req, res){
        const {Id} = req.body;

        const obj = await Card.findByPk(Id);
        obj.destroy();
        app.locals.mensagem = new Mensagem(tipoMensagem.SUCCESS, `Card <span class="text-info">${obj.Nome}</span> deletado!`);
        res.redirect(`/${CardController.routeName}`);
    }
}

module.exports = new CardController();