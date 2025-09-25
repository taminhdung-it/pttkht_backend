const usermodel=require("../Model/register_model");
const crypto = require('crypto');
async function register_user(username, password, email, role_id) {
    try {
        const passwordhash=crypto.createHash('sha512').update(password).digest('hex');
        const username_check = await usermodel.findusername(username);
        const email_check = await usermodel.findemail(email);
        if (username_check[0].length==1) {
            throw new Error("Tên tài khoản bị trùng lặp");
        }
        if (email_check[0].length==1) {
            throw new Error("Email bị trùng lặp");
        }
        return await usermodel.createuser(username, passwordhash, email, role_id);
    } catch (e) {
        return [e]
    }
}
module.exports=register_user;