
const express = require('express');
const {tipoMensagem, Mensagem} = require('../Model/Messagem');
const sequelize = require('../database/db');
const { Sequelize } = require('sequelize');

class HomeController{
    static routeName = 'Home';

    async index(req, res){
        var app = express();
        app.locals.Rota = HomeController.routeName;

        const ViewCard = `SELECT 
                             Card.Id IdCard
                            ,Card.Nome NomeCard
                            ,Card.Descricao DescricaoCard
                            ,Card.Imagem ImagemCard
                            ,Card.TipoImagem TipoImagemCard
                            ,Clan.Id IdClan
                            ,Clan.Nome NomeClan
                            ,Clan.Imagem ImagemClan
                            ,Clan.TipoImagem TipoImagemClan
                            ,Nivel.Id IdNivel
                            ,Nivel.Nome NomeNivel
                            ,Aldeia.Id IdAldeia
                            ,Aldeia.Nome NomeAldeia
                            ,Aldeia.Imagem ImagemAldeia
                            ,Aldeia.TipoImagem TipoImagemAldeia
                        FROM Card
                        LEFT JOIN Nivel ON IdNivel = Nivel.Id
                        LEFT JOIN Aldeia ON IdAldeia = Aldeia.Id
                        LEFT JOIN CLAN On IdClan = Clan.Id`;
        let mensagem = app.locals.mensagem;
        app.locals.mensagem = null;
        
        let view = await sequelize.query(ViewCard, {type: Sequelize.QueryTypes.SELECT }); 
        res.render(HomeController.routeName, { Mensagem: mensagem, rowCard: view, rota: HomeController.routeName });
    }
}

module.exports = new HomeController();