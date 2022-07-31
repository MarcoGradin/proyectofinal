
const express = require('express');
const app = express ();
require ('dotenv').config();
const Port =  process.env.PORT ||8080;
const hbs = require('hbs');
const mysql = require ('mysql2');
const path = require ('path');
const nodemailer = require ('nodemailer');

// //Conectamos nuestra app a una base de datos
// const conexion = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD, 
//     port: process.env.PORTDB,
//     database: process.env.DATABASE
// });

// //Conectamos la DB
// const conectar = (
//     conexion.connect((error) =>{
//         if(error) throw error;
//         console.log('Base de datos conectada!');
//     }
// ));

//Configuración del Middelwares
app.use(express.json());
app.use(express.static (path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: false}));

//Configuración de la vista de la aplicación
app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get ('/', (req,res) =>{
    res.render('index', {titulo: 'Pagina principal'})
});

app.get ('/fullstack', (req,res) =>{
    res.render('fullstack', {titulo: 'Curso de programación Fullstack'} )
});

app.get ('/arduino', (req,res) =>{
    res.render('arduino', {titulo: 'Curso de programación en Arduino'} )
});

app.get ('/python', (req,res) =>{
    res.render('python', {titulo: 'Curso de programación en Python'} )
});

//REGISTRATE
app.get ('/registrate', (req,res) =>{
    res.render('registrate', {titulo: 'Registrate'} )
});

// VERBO HTTP PARA RECIBIR DATOS
app.post("/registrate", (req, res) => {
    console.log("js corriendo")
    console.log("req", req.body);
const { nombre, apellido, nombreusuario, password } = req.body;
//Validacion
    let validacion = "Faltan datos para dejar la consulta";
    if (nombre == "" || apellido == "" ||nombreusuario =="" ||password =="" ) {
    res.render("registrate", {
    titulo: "Faltan datos",
    validacion,
    });
    } else {
    console.log(nombre);
    console.log(apellido);
    console.log(nombreusuario);
    console.log(password);

//conectar()

    let data = {
    nombre: nombre,
    apellido: apellido,
    nuevousuario: nombreusuario,
    nuevacontraseña: password,
    };
    let sql = "INSERT INTO REGISTRATE SET ?";
    let query = conexion.query(sql, data, (error, results) => {
    if (error) throw error;
    res.render("registrate", { titulo: "Ingresa tus datos" });
    });
}
});

app.get("/registrate", (req, res) => {
    let sql = "SELECT * FROM REGISTRATE";
    let query = conexion.query(sql, (error, results) => {
    if (error) throw error;
    res.render("registrate", { titulo: "okey", results });
    });
});

//LOGIN

app.get ('/login', (req,res) =>{
    res.render('login', {titulo: 'Ingresa tus datos para el login'} )
});

// VERBO HTTP PARA RECIBIR DATOS
app.post("/login", (req, res) => {
    console.log("js corriendo")
    console.log("req", req.body);
const { usuario, contraseña} = req.body;
//Validacion
    let validacion = "Faltan datos para dejar la consulta";
    if (usuario == "" || contraseña == "") {
    res.render("registrate", {
    titulo: "Faltan datos",
    validacion,
    });
    } else {
    console.log(usuario);
    console.log(contraseña);

//conectar()

    let data = {
    usuario: usuario,
    contraseña: contraseña,
    };
    let sql = "INSERT INTO INICIASESION SET ?";
    let query = conexion.query(sql, data, (error, results) => {
    if (error) throw error;
    res.render("login", { titulo: "Ingresa tus datos" });
    });
}
});

app.get("/login", (req, res) => {
    let sql = "SELECT * FROM INICIASESION";
    let query = conexion.query(sql, (error, results) => {
    if (error) throw error;
    res.render("registrate", { titulo: "okey", results });
    });
});

app.listen(Port, () =>{
    console.log(`servidor corriendo el puerto ${Port}`);
})

app.on('error', (error)=>{
    console.log('Tenemos un error');
});