
const express = require('express');
const localData = require('../localData/localData');

const controladorProducto = {
    show: function(req, res) {
        const logueado = true;
        let producto = localData.productos[0];
        let usuario = localData.usuario;
        return res.render("productDetail", { producto:producto, logueado, localData, usuario });
    },      

    results: function(req, res) {
        const logueado = false; 
        return res.render("searchResults", { productos: localData.productos, logueado });
    },

    add: function(req, res) {
        const logueado = true; 
        return res.render("addProduct", { title: "express", logueado });
    },

    edit: function(req, res) {
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



