const mongoose = require('mongoose');
const { listarCategorias } = require('./CategoriaController');
require('../models/Postagem');
const Postagem = mongoose.model('Postagens');
require('../models/Categoria');
const Categoria = mongoose.model('Categorias');

module.exports = {
    index(req, res) {
        Postagem.find().populate('categoria').sort({ date: 'desc' }).lean().then((postagens) => {
            res.render('index', { postagens: postagens });
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao carregar a página inicial.");
            res.redirect('/404');
        });
    },

    erro404(req, res) {
        res.send('Erro 404 - Página não encontrada!');
    },

    lerPostagem(req, res) {
        Postagem.findOne({ slug: req.params.slug }).lean().then((postagem) => {
            if (postagem) {
                res.render('postagem/index', { postagem: postagem});
            } else {
                req.flash("error_msg", "Esta postagem não existe.");
                res.redirect('/');
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao carregar o artigo.");
            res.redirect('/');
        });
    },

    erro404(req, res) {
        res.send('Erro 404 - Página não encontrada!');
    },

    listarCategorias(req, res) {
        Categoria.find().lean().then((categorias) => {
            res.render('categorias/index', { categorias: categorias });
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao listar as categorias.");
            res.redirect('/');
        });
    },

    postsPorCategoria(req, res) {
        Categoria.findOne({ slug: req.params.slug }).lean().then((categoria) => {
            if (categoria) {
                Postagem.find({ categoria: categoria._id }).lean().then((postagens) => {
                    res.render('categorias/postagens', { postagens: postagens, categoria: categoria });
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao listar os posts desta categoria.");
                    res.redirect('/');
                });
            } else {
                req.flash("error_msg", "Esta categoria não existe.");
                res.redirect('/categorias');
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria.");
            res.redirect('/categoria');
        });
    }
};