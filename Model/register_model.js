const Connect_Database = require("../Config/database");
async function findusername(username) {
    const conn=await Connect_Database();
    const query="SELECT * FROM users WHERE username=?";
    const value=[username];
    const rows =await conn.execute(query,value);
    return rows
}
async function findemail(email) {
    const conn=await Connect_Database();
    const query="SELECT * FROM users WHERE email=?";
    const value=[email];
    const rows = await conn.execute(query,value);
    return rows
}
async function createuser(username, password, email, role_id){
    const conn=await Connect_Database();
    const query="INSERT INTO users(username,password,email,role_id) VALUES (?,?,?,?)";
    const value=[username, password, email, role_id];
    const rows = await conn.execute(query,value);
    return rows
}
module.exports={findusername,findemail,createuser};