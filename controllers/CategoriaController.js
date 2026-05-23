const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model('Categorias');

module.exports = {
    listarCategorias(req, res) {
        Categoria.find().sort({ date: 'desc' }).lean().then((categorias) => {
            res.render('admin/categorias', { categorias: categorias });
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias.");
            res.redirect('/admin');
        });
    },
    formularioAdd(req, res) {
    res.render("admin/addcategoria");
    },

    formularioEditar(req, res) {
        Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
            res.render('admin/editcategoria', { categoria: categoria });
        }).catch((err) => {
            req.flash("error_msg", "Esta categoria não existe.");
            res.redirect('/admin/categorias');
        });
    },

    atualizarCategoria(req, res) {
        Categoria.findOne({ _id: req.body.id }).then((categoria) => {
            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;
            categoria.save().then(() => {
                req.flash("success_msg", "Categoria editada com sucesso!");
                res.redirect('/admin/categorias');
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria");
            });
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao editar a categoria.");
            res.redirect('/admin/categorias');
        });
    },

    deletarCategoria (req, res) {
        Categoria.deleteOne({ _id: req.body.id }).then(() => {
            req.flash("success_msg", "Categoria deletada com sucesso!");
            res.redirect('/admin/categorias');
        }).catch((err) => {
            req.flash("error_msg", "Houve um erroao deletar a categoria");
            res.redirect('/admin/categorias');
        })
    }
};



