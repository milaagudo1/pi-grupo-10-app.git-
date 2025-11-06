const localData = require('../localData/localData'); // borrar cuando ya este configurado con la base de datos
const db = require('../database/models');
const usuario = db.Usuario;
const bcrypt = require('bcryptjs');


const controladorUsuarios = {
    profile: function (req, res) {
        const usuario = localData.usuario;
        const logueado = true;
        const productos = localData.productos;
        return res.render("profile", { usuario, productos, logueado });
    },

    login: function (req, res) {
        const logueado = false;
        return res.render("login", { logueado });
    },

    register: function (req, res) {
        const logueado = false;
        return res.render("register", { logueado });
    },

    registerprocess: function (req, res) {
        // obtener indormación de usuario 
        let nuevoUsuario = {
            usuario: req.body.name,
            email: req.body.email,
            contrasenia: req.body.password,
            nacionalidad: req.body.nacionalidad
        };

        // verificar que email sea unico
        usuario.findOne({ where: { email: nuevoUsuario.email } })
            .then(function (user1) {
                if (user1 === null) {
                    // validar contraseña
                    if (nuevoUsuario.contrasenia.length >= 3) {
                        usuario.create({
                            usuario: nuevoUsuario.usuario,
                            email: nuevoUsuario.email,
                            contrasenia: bcrypt.hashSync(nuevoUsuario.contrasenia, 10),
                            nacionalidad: nuevoUsuario.nacionalidad
                        }) 
                        .then(function () {
                            return res.redirect("login");
                        });

                    } else {
                        // agregar error usando locals
                        return res.redirect("register");
                    }
                } else {
                    // agregar error usando locals
                    return res.redirect("register");
                }
            })


    }


}

module.exports = controladorUsuarios;



