// const register_user=require("../Service/register_service")
// async function register(req, res) {
//     try {
//         const { username, password, email, role_id } = req.body;
        
//         const result=await register_user( username, password, email, role_id );
//         if (result.length==2){
//             res.status(200).json({
//                 message: `Đăng kí thành công.}`,
//             });
//         } else {
//             throw new Error(result[0]);
//         }
        
//     } catch (e) {
//         res.status(500).json({
//             message: `Đăng kí thất bại.\nBáo lỗi: ${e}`
//         });
//     }
// }
// module.exports={register};