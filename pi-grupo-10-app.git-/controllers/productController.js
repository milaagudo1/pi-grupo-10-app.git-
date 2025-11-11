
const db = require("../database/models");
const Op = db.Sequelize.Op;

const controladorProducto = {
    show: function (req, res) {
        const productoId = req.params.id;

        db.Producto.findByPk(productoId, {
            include: [
                { model: db.Usuario, as: 'usuario' },
                {
                    model: db.Comentario, as: 'comentarios',

                    include: [
                        {
                            model: db.Usuario,
                            as: 'usuario' // este alias debe coincidir con el definido en el modelo Comentario
                        }]
                }
            ]
        })
            .then(function (producto) {
                res.locals.usuario = req.session.usuarioLogueado;

                return res.render("productDetail", { producto });

            })
            .catch(function (error) {
                return res.send(error.message);
            });
    },

    results: function (req, res) {
        let busquedaUsuario = req.query.search;

        if (busquedaUsuario == undefined) {
            busquedaUsuario = "";
        }
        db.Producto.findAll({
            where: {
                nombre: { [Op.like]: '%' + busquedaUsuario + '%' }
            },
            include: [{ model: db.Usuario, as: 'usuario' }]

        })

            .then(function (productos) {
                let mensaje = "";

                if (productos.length === 0) {
                    mensaje = `No se encontraron productos que coincidan con su búsqueda: ${busquedaUsuario}.`;
                }


                return res.render("searchResults", { productos, mensaje });

            })
            .catch(function (error) {
                return res.send(error.message);
            });
    },

    add: function (req, res) {
        return res.render("addProduct", { title: "express" });

    },

    store: function (req, res) {
        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion;
        let urlImagen = req.body.imagen;

        db.Producto.create({
            nombre: nombre,
            descripcion: descripcion,
            imagen: urlImagen,
            usuario_id: req.session.usuarioLogueado.id
        })
            .then(function () {
                res.locals.success = 'Producto creado';
                return res.redirect('/products/add');
            })
            .catch(function (error) {
                return res.send(error.message);
            });
    },

    edit: function (req, res) {
        let id = req.params.id;

        db.Producto.findByPk(id)
            .then(function (product) {
                if (!product) {
                    return res.send("No existe un producto con ese ID");
                }

                return res.render("product-edit", { product });

            })
            .catch(function (error) {
                return res.send(error.message);
            });
    },

    addComment: function (req, res) {

        if (!req.session.usuarioLogueado) {
            return res.redirect('/users/login');
        }

        const productoId = req.params.id;
        const usuarioId = req.session.usuarioLogueado.id;
        const textoComentario = req.body.comentario;

        db.Comentario.create({
            comentario: textoComentario,
            producto_id: productoId,
            usuario_id: usuarioId

        })
            .then(function () {
                return res.redirect('/products/detalle/' + productoId);

            })
            .catch(function (error) {
                return res.send(error.message);
            });
    }
};

module.exports = controladorProducto;

