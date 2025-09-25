require('dotenv').config();
const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_DATABASE,
  process.env.PASSWORD_DATABASE,
  {
    host: process.env.HOST_DATABASE,
    port: process.env.PORT_DATABASE,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
  }
);

// Kiểm tra kết nối
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
};

module.exports = { sequelize, connectDB };