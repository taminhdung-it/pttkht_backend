const express = require("express");
const { login_user, register_user ,add_resident,find_resident} = require("../Service/user-service");

const routes = express.Router();

routes.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const result = await register_user(username, password, email);

        res.status(201).send({
            status: true,
            message: result.message,
            data: result,
        });
    } catch (err) {
        res.status(400).send({
            status: false,
            message: err.message,
        });
    }
});


routes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await login_user(username, password);
        res.status(200).send({
            status: true,
            message: "Đăng nhập thành công",
            data: result
        });
    } catch (err) {
        res.status(400).send({
            status: false,
            message: err.message,
        });
    }
})

routes.post("/register_resident", async(req,res)=>{
    try{
        const {name, dob, gender, room_number, admission_date,phone_number,email,citizen_identification_card}=req.body;
        const result=await add_resident(name, dob, gender, room_number, admission_date,phone_number,email,citizen_identification_card);
        res.status(201).send({
            status: true,
            message: result.message,
            data: result,
        });
    } catch (err) {
        res.status(400).send({
            status: false,
            message: err.message,
        });
    }
})
routes.post("/find_resident",async (req,res)=>{
    try{
        const {citizen_identification_card}=req.body;
        const result=await find_resident(citizen_identification_card);
        res.status(201).send({
            status: true,
            message: result.message,
            data: result,
        });
    } catch (err) {
        res.status(400).send({
            status: false,
            message: err.message,
        });
    }
})
module.exports = routes;