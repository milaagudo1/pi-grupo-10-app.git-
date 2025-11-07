
const express = require('express');
const localData = require('../localData/localData');
const db = require("../database/models");

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
                        as:"comentarios"
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

    results: function (req, res) {
        const logueado = false;
        return res.render("searchResults", { productos: localData.productos, logueado });
    },

    add: function (req, res) {
        const logueado = true;
        return res.render("addProduct", { title: "express", logueado });
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



