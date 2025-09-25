const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/database');  

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    defaultValue: '1'
  },
}, {
  timestamps: true
});
module.exports = User;