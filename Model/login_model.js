// const Connect_Database=require("../Config/database");
// async function loginuser(username,password) {
//     const conn=await Connect_Database();
//     const query=`SELECT * FROM users WHERE username=? AND password=?`;
//     const value=[username,password];
//     const rows =await conn.execute(query,value);
//     return rows;
// }

// async function savetoken(id,security_pass,token_refresh) {
//     const conn=await Connect_Database();
//     const query=`UPDATE users SET security_password=?, token_refresh=? WHERE id=?`;
//     const value=[security_pass,token_refresh,id];
//     const rows=await conn.execute(query,value);
//     return rows
// }
// module.exports={loginuser,savetoken};