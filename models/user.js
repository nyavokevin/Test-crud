'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //override return json
    toJSON() {
      return { ...this.get(), id: undefined }
    }

  };
    User.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: { msg: 'user must have name' },
                notEmpty: { msg: 'must not be empty' }
            }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'user must have gender' },
                notEmpty: { msg: 'must not be empty' }
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'user must have age' },
                notEmpty: { msg: 'must not be empty' }
            }
        },
        street: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        tableName: 'users',
        modelName: 'User'
    })
  return User;
};