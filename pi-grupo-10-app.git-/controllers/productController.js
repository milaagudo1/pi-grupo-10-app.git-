
const db = require("../database/models");
const Op = db.Sequelize.Op;


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
                        as: "comentarios"
                    }
                ],
            }
        )
            .then(function (producto) {
                let usuario = req.session.usuarioLogueado;
                console.log(producto.usuario.id);

                return res.render("productDetail", { producto, logueado, usuario } );
            })
            .catch(function (error) {
                return res.send(error.message)
            })
    },

    search: function (req, res) {
        let palabraBuscada = req.query.search;

        if (palabraBuscada == undefined) {
            return res.render('products/results', { productos: [], mensaje: "No hay resultados para su criterio de búsqueda" });
        } else {
            db.Producto.findAll({
                where: { nombre: { [Op.like]: '%' + palabraBuscada + '%' } },
                include: [
                    { association: 'usuario' } // alias de la asociación definida en el modelo
                ]
            })
                .then(function (productos) {
                    if (productos.length != 0) {
                        return res.render('products/results', { productos: productos });
                    } else {
                        return res.render('products/results', { productos: [], mensaje: "No hay resultados para su criterio de búsqueda" });
                    }
                })
                .catch(function (err) {
                    console.error("Error al crear el usuario:", err);
                    return res.render("error", { error: err });
                });
        }
    },

    results: function (req, res) {
        const logueado = false;
         db.Producto.findAll()
        .then(function (productos) {
            return res.render("searchResults", { productos, logueado });
        })
        .catch(function (error) {
            return res.send(error.message);
        });
    },

    add: function (req, res) {
        const logueado = true;
        return res.render("addProduct", { title: "express", logueado });

    },
    store: function (req, res) {

        console.log(req.session.usuarioLogueado);

        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion;

        db.Producto.create({
            nombre: nombre,
            descripcion: descripcion,
            imagen: '/img/' + req.file.filename,
            usuario_id: req.session.usuarioLogueado.id
        })
            .then(function (data) {
                res.locals.success = 'producto creado'
                return res.redirect('/products/add')
            })
            .catch(function (error) {
                return res.send(error.message)
            })

    },

    edit: function (req, res) {
        const logueado = true;
        let id = req.params.id;

        db.Producto.findByPk(id)
        .then(function (product) {
            let usuario = req.session.usuarioLogueado;

            if (!product) {
                return res.send("No existe un producto con ese ID");
            }

            return res.render("product-edit", { product, logueado, usuario });
        })
        .catch(function (error) {
            return res.send(error.message);
        });
        
    }
};

module.exports = controladorProducto;



