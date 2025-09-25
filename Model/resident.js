const {DataTypes}=require("sequelize");
const { sequelize } = require('../Config/database'); 

const Resident = sequelize.define('Resident', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: true
  },
   room_number: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  admission_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  citizen_identification_card: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true
});
module.exports = Resident;