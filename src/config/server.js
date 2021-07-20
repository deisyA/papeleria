//Importar librerías
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');

//inicializar server 
const app = express();

//settings
//PORT setting
app.set('port', process.env.PORT || 3000);
//gestor de plantillas(vistas) setting
app.set('view engine','ejs');
//route setting for found gestor
app.set('views', path.join(__dirname,'../app/views'));

//middlewarless - files by form reception
//extended:false --datos planos solamente
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//eviroment variables
dotenv.config({path:path.join(__dirname, '..env/.env')});

//css filees location setting
app.use('/resources', express.static(path.join(__dirname, '../public')));

//session managment setting
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,

}))

module.exports = app;