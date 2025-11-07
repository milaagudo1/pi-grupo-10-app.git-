module.exports = function (sequelize, dataTypes) {
    let alias = "Comentario";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        comentario: {
            type: dataTypes.STRING
        },
        producto_id: {
            type: dataTypes.INTEGER,
        },
        usuario_id: {
            type: dataTypes.INTEGER,
        },
    }

    let config = {
        tableName: 'comentarios',
        timestamps: true,
        underscored: true
    };

    const Comentario = sequelize.define(alias, cols, config);


    Comentario.associate = function (models) {
        Comentario.belongsTo(models.Producto, {

            as: "producto", //Asignamos un alias con el que llamaremos a la relación cuando tengamos que usarla en el controlador.

            foreignKey: "producto_id" //Aclaramos el campo donde se encuentra la foreignKey que relacionan ambas tablas.
        });
        Comentario.belongsTo(models.Usuario, {

            as: "usuario",

            foreignKey: "usuario_id"
        })
    }


    return Comentario;
}
