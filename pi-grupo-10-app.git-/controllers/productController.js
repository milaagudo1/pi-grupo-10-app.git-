
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

const controladorProductoEdicion = {
  edit: function(req, res) {
    let id = req.params.id;
    let indice = id - 1;
    let product = localData.productos[indice];

    if (!product) {
      return res.send("No existe un producto con ese ID");
    }
  
        // Renderizamos la vista con el producto
    return res.render("product-edit", { product });
  }
};



module.exports = {
    show: controladorProductoDetalle.show,
    results: controladorProductoBusqueda.results,
    add: controladorAddProduct.add,
   edit: controladorProductoEdicion.edit
};
