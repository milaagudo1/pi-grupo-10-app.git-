
const express = require('express');
const localData = require('../localData/localData');

const controladorProductoDetalle = {
    show: function(req, res) {
                const logueado = true;
        let producto = localData.productos[0]; // producto estático
        let usuario = localData.usuario;
        return res.render("productDetail", { producto: producto, logueado, localData, usuario});
    }
};


const controladorProductoBusqueda = {
    results: function(req, res) {
        const logueado = false;
        return res.render("searchResults", { productos: localData.productos, logueado });
    }
};


const controladorAddProduct = {
    add: function(req, res) {
        const logueado = true;
        return res.render("addProduct", { title: "express", logueado});
    }
};


const controladorProductoEdicion = {
  edit: function(req, res) {
    const logueado = true;
    let id = req.params.id;
    let indice = id - 1;
    let product = localData.productos[indice];




    if (!product) {
      return res.send("No existe un producto con ese ID");
    }
 
        // Renderizamos la vista con el producto
    return res.render("product-edit", { product, logueado,});
  }
};

module.exports = {
    show: controladorProductoDetalle.show,
    results: controladorProductoBusqueda.results,
    add: controladorAddProduct.add,
    edit: controladorProductoEdicion.edit
};


