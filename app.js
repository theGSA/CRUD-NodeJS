const express = require('express');
const bodyParser =  require('body-parser');
const fileUpload  = require('express-fileupload');
const expressLayout = require('express-ejs-layouts');

const HomeController = require('./Controllers/HomeController');
const NivelController = require('./Controllers/NivelController');
const AldeiaController = require('./Controllers/AldeiaController');
const ClanController = require('./Controllers/ClanController');
const CardController = require('./Controllers/CardController');

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(fileUpload());

app.locals.BlobToBase64Content = require('./global/Utils');

app.get('/', HomeController.index);

app.get('/Nivel', NivelController.index);
app.get('/api/Nivel/:id?', NivelController.apiGet);
app.post('/inserirNivel', NivelController.insert);
app.post('/deleteNivel', NivelController.delete);

app.get('/Aldeia', AldeiaController.index);
app.get('/api/Aldeia/:id?', AldeiaController.apiGet);
app.post('/inserirAldeia', AldeiaController.insert);
app.post('/deleteAldeia', AldeiaController.delete);

app.get('/Clan', ClanController.index);
app.get('/api/Clan/:id?', ClanController.apiGet);
app.post('/inserirClan', ClanController.insert);
app.post('/deleteClan', ClanController.delete);

app.get('/Card', CardController.index);
app.get('/api/Card/:id?', CardController.apiGet);
app.post('/inserirCard', CardController.insert);
app.post('/deleteCard', CardController.delete);


app.listen(8083, ()=>{
    console.log("o server está on na porta 8083");
});

