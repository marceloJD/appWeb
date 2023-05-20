/////////////////EXPRTESS////////////////////
let express  =  require('express');
let app = express();

/////////////////REQUIRES////////////////////
let jwt = require('jsonwebtoken');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let path = require('path');

/////////////////CONFIGURACION///////////////////
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/////////////////MIDDLEWARE/////////////////////
let {SECRET_KEY,authenticateJWT} = require('./midelwares/JWTautenticacion')

/////////////////CONTROLADORES///////////////////////
let controladorAlumnos  =  require('./controlador/controladorAlumno.js');
let controladorProfesores = require('./controlador/controladorProfesor.js');
let controladorCursos = require('./controlador/controladorCurso.js');
let controladorPesos = require('./controlador/controladorPesos')
//////////////////ENDPOINTS////////////////////
//2.1 HU : SUPERVISOR PUEDE INGRESAR UN ALUMNO (X)
app.post('/api/ingresarAlumno',authenticateJWT,controladorAlumnos.IngresarAlumno)

//2.2 HU : SUPERVISOR PUEDE MODIFICAR ALUMNOS (X)
app.post('/api/obtenerListaCursos',authenticateJWT,controladorCursos.ObtenerListaDeCursos)
app.post('/api/obtenerListaProfesores',authenticateJWT,controladorProfesores.ObtenerListaDeProfesores)
app.post('/api/modificarListaDeAlumnos',authenticateJWT,controladorAlumnos.ModificarListaDeAlumnos)

//2.4 HU : SUPERVISOR FILTRAR ALUMNOS POR PROFESOR Y CURSO	(?)
app.post('/api/obtenerListaDeAlumnos',authenticateJWT,controladorAlumnos.ObtenerListaDeAlumnos)

//2.5 HU : SUPERVISOR PUEDE EDITAR UN ALUMNO POR DNI (?)
app.post('/api/editarAlumno',authenticateJWT,controladorAlumnos.EditarAlumno)




//3.1 HU : PROFESOR PUEDE DEFINIR LOS PESOS DE LAS NOTAS Y LAS NOTAS 	
app.post('/api/obtenerListaDePesos',authenticateJWT,controladorPesos.ObtenerListaDePesos)
app.post('/api/modificarListaDePesos',authenticateJWT,controladorPesos.ModificarListaDePesos)

//1.1 HU : DOCENTE PUEDE INGRESAR NOTA POR CURSO 
app.post('/api/modificarListaDeNotas',authenticateJWT,controladorAlumnos.ModificarListaDeNotas)

//1.3 HU : DOCENTE PUEDE FILTRAR ALUMNOS Y NOTAS POR CURS
app.post('/api/obtenerListaDeAlumnosConNotas',authenticateJWT,controladorAlumnos.ObtenerListaDeAlumnosConNotas)
	


//LOGIN:
app.post('/api/login',(pregunta,respuest)=>{
    const { usuario, clave , rol  } = pregunta.body;
    //VERIFICACION EN BASE DE DATOS....
    const payload = {
        usuario,
        rol
    };
    const token = jwt.sign(payload, SECRET_KEY);
    respuest.cookie('jwt', token, { httpOnly: true });
    
    respuest.json({ OK: true });
})
//LOGOUT
app.get('/api/logout',(pregunta,respuesta)=>{
    // Eliminar la cookie HTTP Only
    respuesta.clearCookie('jwt');

    //rediriga a appWeb/index.html
    respuesta.redirect('/appWeb/index.html');
})



//////////////////////////////////////////
app.listen( process.env.PORT||3000 , ()=>{
    console.log("EL servidor esat activo")
});

