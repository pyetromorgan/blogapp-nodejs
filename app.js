require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); 
const express = require('express');
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const admin = require('./routes/admin');
const session = require('express-session');
const flash = require('connect-flash');
const HomeController = require('./controllers/HomeController');
const usuarios = require('./routes/usuarios');
const passport = require('passport');
require('./config/auth')(passport);


//padrão MVC - MODEL - VIEW - CONTROLLER

//body parser
    //config
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //handlebars
    app.engine('handlebars', engine({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');

    //public
    app.use(express.static(path.join(__dirname, "public")));
    
    //mongoose
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("MongoDB Atlas conectado com sucesso");
    }).catch((err) => {
        console.log("Erro ao conectar ao MongoDB" + err);
    });

app.use(session({
    secret: "cursodenodejs",
    resave: true,
    saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//rotas
app.use('/admin', admin);
app.use('/usuarios', usuarios);

app.get('/', HomeController.index);
app.get('/404', HomeController.erro404);

app.get('/postagem/:slug', HomeController.lerPostagem);

app.get('/categorias', HomeController.listarCategorias);

app.get('/categorias/:slug', HomeController.postsPorCategoria);


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})