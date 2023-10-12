

    DROP VIEw ViewCard;

    CREATE VIEW ViewCard
    as
    SELECT 
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
    LEFT JOIN CLAN On IdClan = Clan.Id

