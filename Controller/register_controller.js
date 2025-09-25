const register_user=require("../Service/register_service")
async function register(req, res) {
    try {
        const { username, password, email, role_id } = req.body;
        if (username.length < 11) {
            throw new Error("Tên tài khoản không đủ độ dài");
        }
        if (password.length > 19) {
            if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/.test(password)) {
                throw new Error("Mật khẩu không tuân thủ theo quy tắc");
            }
        } else {
            throw new Error("Mật khẩu không đủ độ dài");
        }
        if (email.length > 1) {
            if (!/^[a-zA-Z][a-zA-Z0-9_.]*@[a-zA-Z]+\.(com|net|org)$/.test(email)) {
                throw new Error("Email không sai định đạng");
            }
        } else {
            throw new Error("Email không đủ độ dài");
        }
        if (typeof role_id === "number" && Number.isInteger(role_id)){
            if (!(role_id>-1 && role_id<2)){
                throw new Error("Uỷ quyền không hợp lệ");
            }
        } else{
            throw new Error("Sai định dạng");
        }
        const result=await register_user( username, password, email, role_id );
        if (result.length==2){
            res.status(200).json({
                message: `Đăng kí thành công.}`,
            });
        } else {
            throw new Error(result[0]);
        }
        
    } catch (e) {
        res.status(500).json({
            message: `Đăng kí thất bại.\nBáo lỗi: ${e}`
        });
    }
}
module.exports={register};