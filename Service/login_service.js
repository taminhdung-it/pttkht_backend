const loginmodel = require("../Model/login_model");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
async function login_user(username, password) {
    try {
        const password_hash = crypto.createHash("sha512").update(password).digest("hex");
        const accessSecret = crypto.randomBytes(32).toString("hex");
        const refreshSecret = crypto.randomBytes(64).toString("hex");
        const resurt = await loginmodel.loginuser(username, password_hash);
        if (resurt[0].length == 0) {
            throw new Error("Tài khoản hoặc mật khẩu sai.");
        }
        const data=resurt[0][0];
        const token_access = jwt.sign({ id: data.id, username: data.username }, accessSecret, { expiresIn: "15m" });
        const refresh_access = jwt.sign({ id: data.id, username: data.username }, refreshSecret, { expiresIn: "7d" });
        await loginmodel.savetoken(data.id,refreshSecret,refresh_access);
        return {refresh_access: refresh_access,token_access: token_access,password_token_access: accessSecret,id: data.id,username: data.username};
    } catch (e) {
        return (e);
    }
}
module.exports=login_user;