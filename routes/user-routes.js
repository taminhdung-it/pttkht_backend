const express = require("express");
const { login_user, register_user } = require("../Service/user-service");

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

module.exports = routes;