const mysql = require("mysql2/promise");
require("dotenv").config();
const database_config = {
    host: process.env.HOST_DATABASE,
    port: process.env.PORT_DATABASE,
    database: process.env.DATABASE_NAME,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE
}
async function Connect_Database() {
    try {
        const conn = await mysql.createConnection(database_config);
        return conn;
    } catch (e) {
        console.log(`Kết nối database thất bại.\nBáo lỗi: ${e}`);
        process.exit(0);
    }
}
module.exports = Connect_Database;