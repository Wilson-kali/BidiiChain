'use strict';

module.exports = (sequelize, DataTypes) => {
  const Proof = sequelize.define(
    'Proof',
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
      },
      ipfsHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      submittedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'Proofs',
      timestamps: true,
      paranoid: true
    }
  );

  Proof.associate = (models) => {
    Proof.belongsTo(models.Task, {
      foreignKey: 'taskId',
      as: 'task'
    });

    Proof.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Proof;
};

