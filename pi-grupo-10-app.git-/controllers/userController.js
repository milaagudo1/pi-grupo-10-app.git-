const db = require('../database/models');
const usuario = db.Usuario;
const bcrypt = require('bcryptjs');

const controladorUsuarios = {
    // Perfil usuario
    profile: function (req, res) {
        if (!req.session.usuarioLogueado) {
            return res.redirect('/login');
        }

        const usuarioLogueado = req.session.usuarioLogueado;
        const logueado = true;

        db.Producto.findAll({
            where: { usuario_id: usuarioLogueado.id }
        })
            .then(function (productos) {
                const misProductos = productos.length;

                return res.render("profile", {
                    usuario: usuarioLogueado,
                    productos: productos,
                    misProductos: misProductos,
                    logueado
                });
            })
            .catch(function (error) {
                console.log(error);
                res.render("profile", {
                    usuario: usuarioLogueado,
                    productos: [],
                    misProductos: 0,
                    logueado
                });
            });
    },

    // Login 
    login: function (req, res) {
        if (req.session.usuarioLogueado) {
            return res.redirect(`/users/profile/${req.session.usuarioLogueado.id}`);
        }

        const logueado = false;
        return res.render("login", { logueado, error: "" });
    },

    loginprocess: function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let recordar = req.body.recordar;

        // Validaciones de campos vacíos
        if (!email || !password) {
            return res.render("login", { error: "Debe completar ambos campos." });
        }

        // Buscar el usuario en la base de datos
        usuario.findOne({ where: { email: email } })
            .then(function (usuarioEncontrado) {
                if (!usuarioEncontrado) {
                    return res.render("login", { error: "El email no está registrado." });
                }

                // Verificar contraseña
                const contraseniaOk = bcrypt.compareSync(password, usuarioEncontrado.contrasenia);
                if (!contraseniaOk) {
                    return res.render("login", { error: "La contraseña es incorrecta." });
                }

                // Crear sesión
                req.session.usuarioLogueado = usuarioEncontrado;

                // Recordarme
                if (recordar) {
                    res.cookie("userEmail", usuarioEncontrado.email, { maxAge: 1000 * 60 * 5 }); // 5 minutos
                }

                return res.redirect(`/users/profile/${usuarioEncontrado.id}`);
            })
            .catch(function (err) {
                console.error("Error en login:", err);
                return res.render("login", { error: "Ocurrió un error al iniciar sesión." });
            });
    },


    // Register
    register: function (req, res) {
        if (req.session.usuarioLogueado) {
            return res.redirect(`/users/profile/${req.session.usuarioLogueado.id}`);
        }

        const logueado = false;
        return res.render("register", { logueado, error: "" });
    },

    registerprocess: function (req, res) {
        // obtener información del formulario
        let nuevoUsuario = {
            usuario: req.body.name,
            email: req.body.email,
            contrasenia: req.body.password,
            nacionalidad: req.body.nacionalidad
        };

        // Validar campos vacíos
        if (!nuevoUsuario.email || nuevoUsuario.email.trim() === "") {
            return res.render("register", { error: "El email no puede estar vacío." });
        }

        if (!nuevoUsuario.contrasenia || nuevoUsuario.contrasenia.trim() === "") {
            return res.render("register", { error: "La contraseña no puede estar vacía." });
        }

        // Verificar email único
        usuario.findOne({ where: { email: nuevoUsuario.email } })
            .then(function (user1) {
                if (user1 === null) {
                    // validar contraseña
                    if (nuevoUsuario.contrasenia.length >= 3) {
                        usuario.create({
                            usuario: nuevoUsuario.usuario,
                            email: nuevoUsuario.email,
                            contrasenia: bcrypt.hashSync(nuevoUsuario.contrasenia, 10),
                            nacionalidad: nuevoUsuario.nacionalidad,
                            created_at: new Date()
                        })
                            .then(function () {
                                return res.redirect("/users/login");
                            })
                            .catch(function (error) {
                                console.log("Error al crear el usuario:", error);
                                return res.render("register", { error: "Hubo un problema al registrar el usuario." });
                            });
                    } else {
                        return res.render("register", { error: "La contraseña debe tener al menos 3 caracteres." });
                    }
                } else {
                    return res.render("register", { error: "El email ya está registrado." });
                }
            })
            .catch(function (err) {
                console.error("Error al verificar email:", err);
                return res.render("register", { error: "Hubo un error al verificar el email." });
            });
    },

    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie('userEmail');
        return res.redirect('/');
    }
};

module.exports = controladorUsuarios;
