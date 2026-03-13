'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      walletAddress: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      impactPoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: 'Users',
      timestamps: true,
      paranoid: true
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Proof, {
      foreignKey: 'userId',
      as: 'proofs'
    });

    User.belongsToMany(models.Task, {
      through: models.TaskVolunteer,
      foreignKey: 'userId',
      otherKey: 'taskId',
      as: 'tasks'
    });
  };

  return User;
};

