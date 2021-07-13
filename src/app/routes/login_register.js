const connection = require('../../config/db');
const app = require('../../config/server');
const bcryptjs = require('bcryptjs');

module.exports = app => {

  //14 establecer rutas
//Prueba 1 (crear contenido en el ejs index y asociar el css sin olvidar el 'resources')
//ruta para el index + prueba pasando valores desde node (<%=)
//lo mostrará en el documento renderizado (antes hay que colocar la variable en el archivo ejs)
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', { login: true, msg: req.session.name });
    } else {
        res.render('index', { login: false, msg: '' });
    }
    
    
})
   /* app.get('/', (req,res) => {
        if(req.session.loggedin){
        res.render("../views/index.ejs",{
        login: true,
        name: req.session.name 
        });
        } else {
            res.render("../views/index.ejs" ,{
            login: false,
            name: "Inicie sesión"});
    }
    })*/

    app.get('/logout', (req, res) =>{
        req.session.destroy(()=>{
            res.redirect('/')
        })
    })


    app.get('/login',(req,res)=>{
        res.render('../views/login.ejs');

    })
    app.get('/register',(req,res)=>{
        res.render('../views/register.ejs');

    })
    app.get('/rigths',(req,res)=>{
        res.render('../views/rigths.ejs');

    })


    //15 configurar método register (action del form register)
//como se va a usar bcriptjs se debe usar acá asinc-await
    app.post('/register', async (req, res) => {
        //captura de campos (también puede ser crear un objeto y pasar los valores)
        const rol = req.body.rol;
        const user = req.body.user;
        const pass = req.body.password;
        const passtwo = req.body.passwordTwo;
        const email = req.body.email;
        let passHaash = await bcryptjs.hash(pass, 8);
    
        console.log(pass === passtwo);
        if (pass === passtwo) {
            //insertar datos Guardándolos en un objeto 
            connection.query('INSERT INTO usuario SET ?', {
                nombre_usuario: user,
                correo: email,
                password: passHaash,
                id_rol: rol,
                id_empleado: rol
            }, async (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    //configuracion de alerta de sweetalert
                    //debe haberser insertado el script en register
    
                    res.render('../views/login.ejs', {
                        alert: true,
                        alertTitle: "Registro",
                        alertMessage: "¡Nuevo usuario creado!",
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: ''
                        //se referencian estos valores en el ejs register
                    });
                }
            })
    
        } else {
            res.render('../views/register.ejs', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "La contraseña no coincide",
                alertIcon: "error",
                showConfirmButton: false,
                timer: 3500,
                ruta: 'register'
                //se referencian estos valores en el ejs register
            });
        }
    
    
    });


//16 config método autenticación(/auth en el action del ejs login)
app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    //pasword encriptada
    //let passwordHaash = await bcryptjs.hash(pass, 8);
    //let passHaash = await bcryptjs.hash(pass,8);
    if (user && pass) {
        connection.query('SELECT * FROM usuario WHERE nombre_usuario = ?',
            [user], async (error, results) => {
                if (results.length === 0 || !(await bcryptjs.compare(pass, results[0].password))) {
                    res.render('../views/login.ejs', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "El usuario o la contraseña no coincide",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: 4500,
                        ruta: 'login'
                        //se referencian estos valores en el ejs register
                    });

                } else {
                    req.session.loggedin = true
                    req.session.name = results[0].nombre_usuario
                    req.session.rol = results[0].id_rol
                    console.log(req.session.name);
                    console.log(results[0].id_rol);
                    res.render('../views/index.ejs', {
                        alert: true,
                        alertTitle: "Conexion Exitosa",
                        alertMessage: "Inicio de sesion exitosa",
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 4500,
                        ruta: '',
                        login: true,
                        msg: req.session.name,
                        rol: req.session.rol
                        //se referencian estos valores en el ejs register
                    });
                }
            })
    }
});


    //Solicitudes post de Login
/*
    app.post('/auth', async(req,res) =>{
        const{user,pass} = req.body;
         let passwordHaash = await bcryptjs.hash(pass,8);
 
 
        if (user && pass){
             connection.query('Select * from users where user=?', [user], async(err,results)=>{
                 console.log(results);
                 if(results.length===0 || !(await bcryptjs.compare(pass,results[0].pass))){
                  res.render('../views/login.ejs',{
                    alert:true,
                    alertTitle:"Error",
                    alertMessage:"Usuario y/o contraseña incorrectas",
                    alertIcon:"error",
                    showConfirmButton:false,
                    timer:false,
                    ruta:'/login'
                 });
                }else{
                    req.session.loggedin = true;
                    req.session.name = results[0].name
                    res.render('../views/login.ejs',{
                        alert:true,
                        alertTitle:"Conexion Exitosa",
                        alertMessage:"Login Correcto",
                        alertIcon:"success", 
                        showConfirmButton:false, 
                        timer: 15000, 
                        ruta:'/'
                  });
                }
            })
         }
     })

    /* app.post('/auth', async(req,res)=>{
        const {user,pass} = req.body;
        if(user && pass){
            connection.query("SELECT * FROM users WHERE user= ?", [user], async(error,result)=>{
                console.log(result);
                if(result.length===0 || !(await bcriptjs.compare(pass,result[0].pass))){
                    res.send("Datos erroneos");
                }else{
                    res.send("Ingreso válido");
                }
            })
        }
    })*/


}