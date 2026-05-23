const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model('Categorias');
const CategoriaController = require('../controllers/CategoriaController');
const PostagemController = require('../controllers/PostagemController');
const HomeController = require('../controllers/HomeController');
const { eAdmin } = require('../helpers/eAdmin');

router.get('/', eAdmin, (req, res) => {
    res.render("admin/index"); 
});


router.get('/categorias', eAdmin, CategoriaController.listarCategorias);
router.get('/categorias/add', eAdmin, CategoriaController.formularioAdd);

router.get('/categorias/editar/:id', eAdmin, CategoriaController.formularioEditar);
router.post('/categorias/editar', eAdmin, CategoriaController.atualizarCategoria);

router.post('/categorias/deletar', eAdmin, CategoriaController.deletarCategoria);

router.post('/categorias/nova', eAdmin ,(req, res) => {

    let erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({ texto: "Nome inválido!" });
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({ texto: "Slug inválido!" });
    }

    if (req.body.nome && req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria é muito pequeno!" });
    }

    if (erros.length > 0) {
        res.render('admin/addcategoria', { erros: erros });
    } else {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    };
    
    new Categoria(novaCategoria).save().then(() => {
        req.flash("success_msg", "Categoria criada com sucesso!");
        res.redirect('/admin/categorias');
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente.")
        res.redirect('/admin/categorias');
    });

    }
});

router.get('/postagens', PostagemController.listarPostagens);
router.get('/postagens/add', PostagemController.formularioAdd);

router.post('/postagens/nova', PostagemController.salvarPostagem);

router.get('/postagens/editar/:id', PostagemController.formularioEditar);

router.post('/postagens/editar', PostagemController.atualizarPostagem);

router.get('/postagens/deletar/:id', PostagemController.deletarPostagem);


module.exports = router;