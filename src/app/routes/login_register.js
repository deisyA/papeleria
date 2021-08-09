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


//ruta de pruebas /**Debe conectarse a la base de datos inventario para funcionar */
app.get('/inventory',(req,res)=>{
    connection.query("SELECT * FROM repaso", (err, result) =>{
        if (err){
            res.send(err)
        }else{
            console.log(result);
            res.render('../views/inventoryPruebas.ejs', {
                inventario: result
            });

        }
    })
    //
})

app.get('/employee',(req,res)=>{
    connection.query("SELECT * FROM empleado", (err, result) =>{
        if (err){
            res.send(err)
        }else{
            console.log(result);
            res.render('../views/employee.ejs', {
                employee: result
            });

        }
    })
    //
})

app.get('/users',(req,res)=>{
    connection.query("SELECT * FROM usuario", (err, result) =>{
        if (err){
            res.send(err)
        }else{
            console.log(result);
            res.render('../views/users.ejs', {
                users: result
            });

        }
    })
    //
})


app.get('/product',(req,res)=>{
    connection.query("SELECT * FROM producto", (err, resultp) =>{
        if (err){
            res.send(err)
        }else{
            console.log(resultp);
            connection.query("SELECT * FROM existencia", (error, resulte) =>{
                if (error){
                    res.send(error)
                }else{
                    console.log(resulte); 
                    connection.query("SELECT * FROM entrada_producto", (error, resultep) =>{
                        if (error){
                            res.send(error)
                        }else{
                            console.log(resultep);  
                            res.render('../views/products.ejs', {
                                product: resultp,
                                existence: resulte,
                                in_product: resultep   
                            });
                     
                        }
                    })
                }
            })
        }
    })
})

app.get('/newproduct',(req,res)=>{
    res.render('../views/newproduct.ejs');

})

app.get('/invoice',(req,res)=>{
    res.render('../views/invoice.ejs');

})

app.get('/newin',(req,res)=>{
    res.render('../views/newin.ejs');

})

app.get('/newout',(req,res)=>{
    res.render('../views/newout.ejs');

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

        //post nueva factura
    app.post('/invoice', async (req, res) => {        
        const id_supplier = req.body.id_supplier;
        const id_employee = req.body.id_employee;
        const value = req.body.value;
        const shape = req.body.shape;
        const date = req.body.date;
        const creator = req.body.creator;

            //insertar datos Guardándolos en un objeto 
        connection.query('INSERT INTO factura SET ?', {
            id_proveedor: id_supplier,
            id_documento : id_employee,
            valor_factura: value,
            forma: shape,
            fecha_factura: date,                
            creador_registro: creator
        }, async (error, results) => {
            if (error) {
                console.log(error)
            } else {
                //configuracion de alerta de sweetalert
                //debe haberser insertado el script en register

                res.render('../views/invoice.ejs', {
                    alert: true,
                    alertTitle: "Factura",
                    alertMessage: "¡Nuevo registro de factura!",
                    alertIcon: "success",
                    showConfirmButton: true,
                    timer: 4000,
                    ruta: 'invoice'
                    //se referencian estos valores en el ejs register
                });
            }
        })
    
    });

    //post nuevo producto
    app.post('/newproduct', async (req, res) => {
        //captura de campos (también puede ser crear un objeto y pasar los valores)
        const name = req.body.name;
        const ref = req.body.ref;
        const trademark = req.body.trademark;
        const color = req.body.color;
        const presentation = req.body.presentation;
        const weigth = req.body.weigth;
        const type = req.body.type;
        const size = req.body.size;
        const description = req.body.description;
        const words = req.body.words;
        const creator = req.body.creator;
        
            //insertar datos Guardándolos en un objeto 
            connection.query('INSERT INTO producto SET ?', {
                nombre_producto: name,
                referencia_producto : ref,
                marca_producto: trademark,
                color_producto: color,
                presentacion: presentation,
                //peso: weigth,
                tipo_medida: type,
                tamaño: size,
                descripcion_producto: description,
                palabras_clave: words,
                creador_registro: creator
            }, async (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    //configuracion de alerta de sweetalert
                    //debe haberser insertado el script en register
    
                    res.render('../views/products.ejs', {
                        alert: true,
                        alertTitle: "Registro",
                        alertMessage: "¡Nuevo producto creado!",
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: ''
                        //se referencian estos valores en el ejs register
                    });
                }
            })
    
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


   


}