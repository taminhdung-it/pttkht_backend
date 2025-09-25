const login_user = require("../Service/login_service");
async function login(req, res) {
    try {
        const { username, password } = req.body;
        if (username.length < 10) {
            throw new Error("Tên tài khoản không tồn tại.");
        }
        if (password.length < 20) {
            throw new Error("Mật khẩu không không tồn tại.");
        }
        const result=await login_user(username,password);
        res.status(200).json({
            message: "Đăng nhập thành công",
            id: result.id,
            username: result.username,
            password_token_access: result.password_token_access,
            token_access: result.token_access,
            token_refresh: result.refresh_access
        })
    } catch (e) {
        res.status(500).json({
            message: `đăng nhập thất bại.\nBáo lỗi: ${e}`
        })
    }
}
module.exports={login};