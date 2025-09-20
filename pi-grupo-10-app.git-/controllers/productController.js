
const express = require('express');
const localData = require('../localData/localData');

const controladorProductoDetalle = {
    show: function(req, res) {
        let producto = localData.productos[0]; // producto estático
        return res.render("productDetail", { producto: producto });
    }
};

const controladorProductoBusqueda = {
    results: function(req, res) {
        return res.render("searchResults", { productos: localData.productos });
    }
};

const controladorAddProduct = {
    add: function(req, res) {
        return res.render("addProduct", { title: "express" });
    }
};

module.exports = {
    show: controladorProductoDetalle.show,
    results: controladorProductoBusqueda.results,
    add: controladorAddProduct.add
};
