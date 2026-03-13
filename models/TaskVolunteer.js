'use strict';

module.exports = (sequelize, DataTypes) => {
  const TaskVolunteer = sequelize.define(
    'TaskVolunteer',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'TaskVolunteers',
      timestamps: true,
      paranoid: true
    }
  );

  TaskVolunteer.associate = () => {};

  return TaskVolunteer;
};

