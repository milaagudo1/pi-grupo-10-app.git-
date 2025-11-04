module.exports = function (sequelize, DataTypes) {
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

        contraseña: {
            type: dataTypes.STRING
        },

        fechaNacimiento: {
            type: dataTypes.DATE
        },

        dni: {
            type: dataTypes.INTEGER
        },

        imagenPerfil: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: 'usuarios',
        timestamps: true,
        underscored: false
    };

    const Usuario = sequelize.define(alias, cols, config);



    Usuario.associate = function (models) {
        Usuario.hasMany(models.Producto, {
            as: "productos",
            foreignKey: 'idUsuario'
        })
        Usuario.hasMany(models.Comentario, {
            as: "comentarios",
            foreignKey: "idUsuario"


        });
    }

    return Usuario;
}
