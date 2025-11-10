module.exports = function (sequelize, dataTypes) {
    let alias = "Producto";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },

        imagen: {
            type: dataTypes.STRING
        },

        nombre: {
            type: dataTypes.STRING
        },

        descripcion: {
            type: dataTypes.STRING
        },
        usuario_id: {
            type: dataTypes.INTEGER
        },
    };

    let config = {
        tableName: 'productos',
        timestamps: true,
        underscored: true
    };

    const Producto = sequelize.define(alias, cols, config);


    Producto.associate = function (models) {
        Producto.belongsTo(models.Usuario, {

            as: "usuario", //Asignamos un alias con el que llamaremos a la relación cuando tengamos que usarla en el controlador.
            foreignKey: "usuario_id" //Aclaramos el campo donde se encuentra la foreignKey que relacionan ambas tablas.
        });

        Producto.hasMany(models.Comentario, {
            
            as: "comentarios",
            foreignKey: "producto_id"
        })
    }

    return Producto;
}
