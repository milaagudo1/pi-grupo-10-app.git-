
const express = require('express');
const localData = require('../localData/localData');
const db = require("../database/models");
const Product = db.Producto;      // alias del modelo producto
const Usuario = db.Usuario;      // alias del modelo usuario
const Op = db.Sequelize.Op;


const controladorProducto = {
    show: function (req, res) {
        const logueado = true;
        const productoId = req.params.id

        db.Producto.findByPk(productoId,
            {
                include: [
                    {
                        model: db.Usuario,
                        as: 'usuario', // si usaste un alias
                    },
                    {
                        model: db.Comentario,
                        as: "comentarios"
                    }
                ],
            }
        )
            .then(function (producto) {
                let usuario = localData.usuario;
                console.log(producto.usuario.id);

                return res.render("productDetail", { producto: producto, logueado, localData, usuario });
            })
            .catch(function (error) {
                return res.send(error.message)
            })
    },

    search: function (req, res) {
        let palabraBuscada = req.query.search;

        if (palabraBuscada == undefined) {
            return res.render('products/results', { productos: [], mensaje: "No hay resultados para su criterio de búsqueda" });
        } else {
            db.Producto.findAll({
                where: { nombre: { [Op.like]: '%' + palabraBuscada + '%' } },
                include: [
                    { association: 'usuario' } // alias de la asociación definida en el modelo
                ]
            })
                .then(function (productos) {
                    if (productos.length != 0) {
                        return res.render('products/results', { productos: productos });
                    } else {
                        return res.render('products/results', { productos: [], mensaje: "No hay resultados para su criterio de búsqueda" });
                    }
                })
                .catch(function (err) {
                    console.error("Error al crear el usuario:", err);
                    return res.render("error", { error: err });
                });
        }
    },

    results: function (req, res) {
        const logueado = false;
        return res.render("searchResults", { productos: localData.productos, logueado });
    },

    add: function (req, res) {
        const logueado = true;
        return res.render("addProduct", { title: "express", logueado });

    },
    store: function (req, res) {

        console.log(req.session.usuario);

        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion;

        db.Producto.create({
            nombre: nombre,
            descripcion: descripcion,
            imagen: '/img/' + req.file.filename,
            usuario_id: req.session.usuario.id
        })
            .then(function (data) {
                res.locals.success = 'producto creado'
                return res.redirect('/products/add')
            })
            .catch(function (error) {
                return res.send(error.message)
            })

    },

    edit: function (req, res) {
        const logueado = true;
        let id = req.params.id;
        let indice = id - 1;
        let product = localData.productos[indice];
        let usuario = localData.usuario;


        if (!product) {
            return res.send("No existe un producto con ese ID");
        }

        return res.render("product-edit", { product, logueado, usuario });
    }
};

module.exports = controladorProducto;



