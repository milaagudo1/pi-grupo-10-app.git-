module.exports = function (sequelize, dataTypes) {
    let alias = "Usuario";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },

        usuario: {
            type: dataTypes.STRING
        },

        email: {
            type: dataTypes.STRING
        },  

        contrasenia: {
            type: dataTypes.STRING
        },

        avatar: {
            type: dataTypes.STRING
        },

        nacionalidad: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: 'usuarios',
        timestamps: true,
        underscored: true
    };

    const Usuario = sequelize.define(alias, cols, config);



    /*Usuario.associate = function (models) {
        Usuario.hasMany(models.Producto, {
            as: "productos",
            foreignKey: 'idUsuario'
        })
        Usuario.hasMany(models.Comentario, {
            as: "comentarios",
            foreignKey: "idUsuario"


        });
    }*/

    return Usuario;
}
