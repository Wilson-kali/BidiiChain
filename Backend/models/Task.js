'use strict';

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      reward: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      requiredVolunteers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      tableName: 'Tasks',
      timestamps: true,
      paranoid: true
    }
  );

  Task.associate = (models) => {
    Task.hasMany(models.Proof, {
      foreignKey: 'taskId',
      as: 'proofs'
    });

    Task.belongsToMany(models.User, {
      through: models.TaskVolunteer,
      foreignKey: 'taskId',
      otherKey: 'userId',
      as: 'volunteers'
    });
  };

  return Task;
};

