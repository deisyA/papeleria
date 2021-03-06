const connection = require('../../config/db');
const app = require('../../config/server');
const bcryptjs = require('bcryptjs');

module.exports = app => {

  //14 establecer rutas
//Prueba 1 (crear contenido en el ejs index y asociar el css sin olvidar el 'resources')
//ruta para el index + prueba pasando valores desde node (<%=)
//lo mostrarĂ¡ en el documento renderizado (antes hay que colocar la variable en el archivo ejs)
   app.get('/', (req, res) => {
      if (req.session.loggedin) {
         res.render('index', { login: true, msg: req.session.name });
      } else {
         res.render('index', { login: false, msg: '' });
      }        
   })
 
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

   
   app.get('/actualizeinv',(req,res)=>{
      res.render('../views/actualizeInv.ejs');
   })

   app.get('/rigths',(req,res)=>{
      res.render('../views/rigths.ejs');
   })

//ruta de pruebas /**Debe conectarse a la base de datos inventario para funcionar */
/*
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
})*/

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
   })

   app.get('/user/:id_usuario', (req, res) =>{
      const id_usuario = req.params.id_usuario;      
      connection.query('UPDATE usuario SET activo_usuario = 0 WHERE id_usuario = ?', [id_usuario], (err,resul) =>{
         if(err){
               res.send(err)
         }else{
               res.redirect('/users')
         }
      })
   })

//sin detallar
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
                              //console.log("inicio registros entrada producto**********")
                              console.log(resultep);  
                              connection.query("SELECT * FROM salida_producto", (error, results) =>{
                                 if (error){
                                       res.send(error)
                                 }else{
                                       console.log(results);
                                       res.render('../views/products.ejs', {
                                          product: resultp,
                                          existence: resulte,
                                          in_product: resultep,
                                          out_product: results   
                                       });
                                 }
                              })
                              
                        
                           }
                     })
                  }
               })
         }
      })
   })

//sin detallar
//delete product = producto inactivo = activo_producto -> 0
   app.get('/prod/:id_producto', (req, res) =>{
      const id_producto = req.params.id_producto;    
      connection.query('UPDATE producto SET activo_producto = 0 WHERE id_producto = ?', [id_producto], (err,resul) =>{
         if(err){
               res.send(err)
         }else{
               res.redirect('/product')
         }
      })
   })
   app.get('/delete/:id_producto', (req, res) =>{
      const id_producto = req.params.id_producto;    
      connection.query('UPDATE producto SET activo_producto = 0 WHERE id_producto = ?', [id_producto], (err,resul) =>{
         if(err){
               res.send(err)
         }else{
               res.redirect('/product')
         }
      })
   })

//sin detallar (check)
//review all rows of one product 
//query table exsistencias para cantidad en inventario
   app.get('/product/:id_producto', (req, res) =>{
      const id_producto = req.params.id_producto;
      connection.query("SELECT * FROM producto WHERE id_producto = ?", [id_producto], (err, resul) =>{
         if (err){
               res.send(err)
         }else{
            console.log(resul); 
            connection.query("SELECT salidas FROM inventario WHERE id_producto = ?", [id_producto], (err, resul1) =>{
               if (err){
                     res.send(err)
               }else{
                  console.log(resul1); 
                              connection.query("SELECT entradas FROM inventario WHERE id_producto = ?", [id_producto], (err, resul3) =>{
               if (err){
                     res.send(err)
               }else{
                  console.log(resul3);      
                  connection.query("SELECT existencias FROM inventario WHERE id_producto = ?", [id_producto], (err, resul2) =>{
               if (err){
                     res.send(err)
               }else{
                  console.log(resul2);            
                  res.render('../views/inventory.ejs', {
                     extprod: resul2,
                     detprod: resul,
                     entradasprod: resul3,
                     salidasprod: resul1                
                  });        
               }
            })   
               };        
            })
                  
               };        
            })

            
         }
      }) //  res.send("identificador de producto  "+ id_producto)
   })

   app.get('/newproduct',(req,res)=>{
      res.render('../views/newproduct.ejs');
   })

   app.get('/invoice',(req,res)=>{
      res.render('../views/invoice.ejs');
   })

//sin detallar
//form POST table (change table)**********
app.get('/newin',(req,res)=>{
    res.render('../views/newin.ejs');
})

//sin detallar
//form POST table (change table)**********
app.get('/newout',(req,res)=>{
    res.render('../views/newout.ejs');

})

                                          /**********************POST****************** */

   //nuevo usuario = credenciales de acceso
   app.post('/register', async (req, res) => {
        //captura de campos (crear un objeto y pasar los valores)
         const rol = req.body.rol;
         const user = req.body.user;
         const pass = req.body.password;
         const passtwo = req.body.passwordTwo;
         const email = req.body.email;
         let passHaash = await bcryptjs.hash(pass, 8);
         //verificaciĂ³n del password
         console.log(pass === passtwo);
         if (pass === passtwo) {
               //insertar datos GuardĂ¡ndolos en un objeto 
               connection.query('INSERT INTO usuario SET ?', {
                  nombre_usuario: user,
                  correo: email,
                  password: passHaash,
                  id_rol: rol,
                  id_empleado: rol
               }, async (error, results) => {
                     if (error) {
                        console.log(error)
                     }else{
                        //configuracion de alerta de sweetalert
                        // insertar el script en register    
                        res.render('../views/login.ejs', {
                           alert: true,
                           alertTitle: "Registro",
                           alertMessage: "Â¡Nuevo usuario creado!",
                           alertIcon: "success",
                           showConfirmButton: true,
                           timer: 5000,
                           ruta: ''
                           //se referencian estos valores en el ejs register
                        });
                     }
                  })    
         }else {
               res.render('../views/register.ejs', {
                  alert: true,
                  alertTitle: "Error",
                  alertMessage: "La contraseĂ±a no coincide",
                  alertIcon: "error",
                  showConfirmButton: true,
                  timer: 5000,
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
         //insertar datos  
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
         }else{
            res.render('../views/invoice.ejs', {
               alert: true,
               alertTitle: "Factura",
               alertMessage: "Â¡Nuevo registro de factura!",
               alertIcon: "success",
               showConfirmButton: true,
               timer: 4000,
               ruta: 'invoice'              
            });
         }
      })   
   });

   //post nuevo producto
   //insert product to inventario (no existence)
    app.post('/newproduct', async (req, res) => {    
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
      connection.query('INSERT INTO producto SET ?', {
         nombre_producto: name,
         referencia_producto : ref,
         marca_producto: trademark,
         color_producto: color,
         presentacion: presentation,
         //peso: weigth,
         tipo_medida: type,
         tamaĂ±o: size,
         descripcion_producto: description,
         palabras_clave: words,
         creador_registro: creator
         }, async (error, results) => {
            if (error) {
               console.log(error)
            }else{
               console.log(results)               
               product: results,
               res.render('../views/newproduct.ejs', {
                  alert: true,
                  alertTitle: "Registro",
                  alertMessage: "Â¡Nuevo producto creado!",
                  alertIcon: "success",
                  showConfirmButton: true,
                  timer: 5000,
                  ruta: 'newproduct'
               });
               }
         })
         //query add new product to inventory
      connection.query("SELECT id_producto FROM producto ORDER BY id_producto", (error, resultid) =>{
         if (error){
               res.send(error)
         }else{                                                        
            console.log(resultid);  
            console.log(resultid[resultid.length-1].id_producto)
            last_product: resultid 
            connection.query('INSERT INTO inventario SET ?', {
               id_producto: resultid[resultid.length-1].id_producto,                
            })//res.render('../views/newin.ejs');                     
         }
      });      
    });

   app.post('/actualizeinv', async (req, res) => {
      //captura de campos (tambiĂ©n puede ser crear un objeto y pasar los valores)
      const id_product = req.body.id_product;
      const id_type = req.body.id_type;
      const cant = req.body.cant;
      const value = req.body.value;
      const value_u = req.body.value_u;

      connection.query('INSERT INTO detalle_movimiento SET ?', {
         id_producto: id_product,
         id_tipo : id_type,
         cantidad_detalle : cant,
         valor: value,
         valor_unitario : value_u,
      }, async (error, results) => {
         if (error) {
            console.log(error)
         } else {

            const id_producto = req.params.id_product;  
            connection.query("SELECT existencias FROM inventario WHERE id_producto = ?",[id_product],(error, resultcant) =>{                
               if (error){
                     res.send(error)
               }else{                                                        
                  console.log("existencias  "+resultcant);
            
                  if(id_type ==2 ){
                     connection.query("SELECT cantidad_detalle FROM detalle_movimiento WHERE id_tipo = 2 AND id_producto = ?",[id_product],(error, resout) =>{
                        if (error){
                              res.send(error)
                        }else{                                                        
                           console.log("salidas  "+resout);
                           let sumasalida = 0;
                           for (let i=0; i<resout.length;i++){
                              sumasalida += resout[i].cantidad_detalle
                           }console.log(sumasalida)
                           let resta=resultcant[0].existencias-cant
                           console.log(resta)
                           connection.query("UPDATE inventario SET salidas = ?, existencias = ? WHERE id_producto = ? ",[sumasalida,resta,id_product],(err, resultout)=>{
                              //UPDATE `inventario` SET `salidas` = 3, `existencias` = 20 WHERE `id_producto` = 9
                              if(err){
                                 res.send(err)
                              }else{
                                 console.log("salida actualizada, insertĂ³: " + resultout)                              
                              }
                           })    
                           res.render('../views/actualizeInv.ejs', {
                              alert: true,
                              alertTitle: "Registro exitoso",
                              alertMessage: "Â¡AcutalizaciĂ³n de inventario!",
                              alertIcon: "success",
                              showConfirmButton: true,
                              timer: 5000,
                              ruta: 'actualizeinv' 
                           // ,{inventariosalida: resultout} 
                           });                                        
                        }
                     });     
                  }else if (id_type ==1) {                                    
                     connection.query("SELECT cantidad_detalle FROM detalle_movimiento WHERE id_tipo = 1 AND id_producto = ?",[id_product],(error, resin) =>{
                        if (error){
                           res.send(error)
                        }else{                                                        
                           console.log("entradas  "+resin); 
                           let sumaentrada = 0;
                           for (let i=0; i<resin.length;i++){
                              sumaentrada += resin[i].cantidad_detalle
                           }console.log(sumaentrada)
                           let suma=sumaentrada
                           console.log(suma)
                           connection.query("UPDATE inventario SET entradas = ?, existencias = ? WHERE id_producto = ? ",[sumaentrada,suma,id_product],(err, resultin)=>{
                              if(err){
                                 res.send(err)
                              }else{
                                 console.log("entrada actualizada, intertĂ³:  " + resultin)                              
                              }
                           })
                           res.render('../views/actualizeInv.ejs', {
                              alert: true,
                              alertTitle: "Registro",
                              alertMessage: "Â¡AcutalizaciĂ³n de inventario!",
                              alertIcon: "success",
                              showConfirmButton: true,
                              timer: 4000,
                              ruta: 'actualizeinv' 
                           // ,{inventariosalida: resultout} 
                           });                                 
                        }
                     });  
                  }                         
               }
            });        
         }
      }
      )
   });
    /****************************************funcional hasta aquĂ­ */
   app.post('/edit/:id_producto', async(req,res) =>{
      const id_producto = req.params.id_producto      
      const {ref,trademark,color,presentation, weigth,type,size,description,words}=req.body;
      const nombre = req.body.nombre_producto;
      //res.send("id  "+ id_producto + "   nombre  "+ nombre +ref)

      connection.query('UPDATE producto SET nombre_producto = ?, referencia_producto = ?, marca_producto = ?, color_producto = ?, presentacion = ?, peso = ?, tipo_medida = ?, tamaĂ±o = ?, descripcion_producto = ?, palabras_clave = ? WHERE id_producto = ?',[nombre,ref,trademark,color,presentation, weigth,type,size,description,words,id_producto], (err,re)=>{
         if(err){
            res.send(err)
      }else{
            res.redirect('/product')
      }
      })
   })

    //post nuevo producto al inventario
    app.post('/newin', async (req, res) => {
        //captura de campos (tambiĂ©n puede ser crear un objeto y pasar los valores)
        const id_product = req.body.id_product;
        const id_invoice = req.body.id_invoice;
        const concept = req.body.concept;
        const cant = req.body.cant;
        const warranty = req.body.warranty;
        const expitation = req.body.expitation;
        const cost = req.body.cost;
        const percent = req.body.percent; 
        const creator = req.body.creator;
            connection.query('INSERT INTO entrada_producto SET ?', {
                id_producto: id_product,
                id_factura : id_invoice,
                concepto_entrada: concept,
                cantidad_entrada: cant,
                garantia: warranty,
                vencimiento: expitation,
                costo: cost,
                porcentaje_ganancia: percent,
                creador_registro: creator
            }, async (error, results) => {
                if (error) {
                    console.log(error)
                } else {                        
                    connection.query("SELECT id_entrada_producto FROM entrada_producto", (error, resultep) =>{
                        if (error){
                            res.send(error)
                        }else{                                                        
                            console.log(resultep);  
                            console.log(resultep[resultep.length-1].id_entrada_producto)
                            last_product: resultep 
                            connection.query('INSERT INTO existencia SET ?', {
                            id_entrada_producto: resultep[resultep.length-1].id_entrada_producto,
                            cantidad_lote: cant 
                            })

                            res.render('../views/newin.ejs', {
                                alert: true,
                                alertTitle: "Registro",
                                alertMessage: "Â¡Nuevos productos en el inventario!",
                                alertIcon: "success",
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: '' 
                            });                     
                        }
                    });                   
                }
            })    
    });

    //post salida de productos
    app.post('/newout', async (req, res) => {        
        const id_product = req.body.id_product;
        const concept = req.body.concept;
        const cant = req.body.cant;
        const price = req.body.price;
        const duty = req.body.duty;
        const creator = req.body.creator;
        
            connection.query('INSERT INTO salida_producto SET ?', {
                id_producto: id_product,
                concepto_salida : concept,
                cantidad_salida: cant,
                precio_venta: price,
                responsable_salida: duty,                
                creador_registro: creator
            }, async (error, results) => {
                if (error) {
                    console.log(error)
                } else {   
                  
                    connection.query("SELECT * FROM existencia", (error, resultex) =>{
                        if (error){
                            res.send(error)
                        }else{                                                        
                            console.log(resultex);  
                            /*console.log(resultsp[resultsp.length-1].id_entrada_producto)
                            connection.query('UPDATE existencia SET ?', {
                                UPDATE `existencia` SET `cantidad_lote` = '15' WHERE `existencia`.`id_existencia` = 4;
                            id_entrada_producto: resultsp[resultsp.length-1].id_entrada_producto,
                            cantidad_lote: cant 
                            })*/

                            res.render('../views/newout.ejs', {
                                alert: true,
                                alertTitle: "Retiro",
                                alertMessage: "Â¡Producto retirado del inventario!",
                                alertIcon: "success",
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'newout' 
                            });                     
                        }
                    });                   
                }
            })    
    });

//16 config mĂ©todo autenticaciĂ³n(/auth en el action del ejs login)
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
                        alertMessage: "El usuario o la contraseĂ±a no coincide",
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