
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
        // Si vienen datos por query, actualizamos y redirigimos
        if (req.query.nombre || req.query.precio) {
            if (req.query.nombre) product.nombre = req.query.nombre;
            if (req.query.precio) product.precio = req.query.precio;

            return res.redirect('/products/results'); // o a detalle del producto
        }

        // Si no vienen datos, solo renderizamos el formulario
        return res.render("/products/results");
     }
};


module.exports = {
    show: controladorProductoDetalle.show,
    results: controladorProductoBusqueda.results,
    add: controladorAddProduct.add,
   edit: controladorProductoEdicion.edit
};
