const mongoose = require('mongoose');
const { listarCategorias, formularioAdd, formularioEditar, atualizarCategoria } = require('./CategoriaController');
require('../models/Postagem');
const Postagem = mongoose.model('Postagens');
const Categoria = mongoose.model('Categorias');

module.exports = {
    listarPostagens(req, res) {
        Postagem.find().populate('categoria').sort({ date: 'desc' }).lean().then((postagens) => {
            res.render('admin/postagens', { postagens: postagens});         
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as postagens.");
            res.redirect('/admin');
        });
    },

    formularioAdd(req, res) {
        Categoria.find().lean().then((categorias) => {
            res.render('admin/addpostagem', { categorias: categorias });
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao carregar o formulário de postagens.");
            res.redirect('/admin');
        });
    },

    salvarPostagem(req, res) {
        let erros = [];

        if (req.body.categoria == "0") {
            erros.push({ texto: "Categoria inválida, registre uma categoria antes de postar." });
        }

        if (erros.length > 0) {
            res.render('admin/addpostagem', { erros: erros });
        } else {
            const novaPostagem = {
                titulo: req.body.titulo,
                slug: req.body.slug,
                descricao: req.body.descricao,
                conteudo: req.body.conteudo,
                categoria: req.body.categoria 
            };

            new Postagem(novaPostagem).save()
                .then(() => {
                    req.flash("success_msg", "Postagem criada com sucesso!");
                    res.redirect('/admin/postagens');
                })
                .catch((err) => {
                    req.flash("error_msg", "Houve um erro durante o salvamento da postagem.");
                    res.redirect('/admin/postagens');
                });
        }
    },

    formularioEditar(req, res) {

        Postagem.findOne({ _id: req.params.id }).lean().then((postagem) => {
            Categoria.find().lean().then((categorias) => {
                res.render('admin/editpostagens', { categorias: categorias, postagem: postagem });
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao listar as categorias.");
                res.redirect('/admin/postagens');
            });
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao carregar o formulário de edição.");
            res.redirect('/admin/postagens');
        });
    },

    atualizarPostagem(req, res) {
        Postagem.findOne({ _id: req.body.id }).then((postagem) => {
            postagem.titulo = req.body.titulo;
            postagem.slug = req.body.descricao;
            postagem.descricao = req.body.conteudo;
            postagem.conteudo = req.body.conteudo;
            postagem.categoria = req.body.categoria;

            postagem.save().then(() => {
                req.flash("success_msg", "Postagem editada com sucesso!");
                res.redirect('/admin/postagens');
            }).catch((err) => {
                req.flash("error_msg", "Erro interno ao salvar a alteração.");
                res.redirect('/admin/postagens');
            });
        }).catch((err) => {
            console.log(err);
            req.flash("error_msg", "Houve um erro ao salvar a edição.");
            res.redirect('/admin/postagens');
        });
    },

    deletarPostagem(req, res) {
        Postagem.deleteOne({ _id: req.params.id }).then(() => {
            req.flash("success_msg", "Postagem deletada com sucesso!");
            res.redirect('/admin/postagens');
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao deletar a postagem.");
            res.redirect('/admin/postagens');
        });
    }
};