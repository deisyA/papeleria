const app = require('./config/server');

const connection = require('./config/db');

 
//render
const ruta = require('./app/routes/login_register')(app);

//port lisening
app.listen(app.get('port'),()=>{
    console.log("Servidor en el puerto ", app.get('port'));

})