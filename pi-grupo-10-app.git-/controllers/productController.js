
const express = require('express');
const localData = require('../localData/localData');

const controladorProductoDetalle = {
    show: function(req, res) {
        let producto = localData.productos[0]; // producto estático
        return res.render("productDetail", { producto: producto });
    }
};

module.exports = controladorProductoDetalle;
