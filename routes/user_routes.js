const express=require("express");
const register_controller=require("../Controller/register_controller");
const login_controller=require("../Controller/login_controller");
const routes=express.Router();
routes.post("/register",register_controller.register);
routes.post("/login",login_controller.login);
module.exports=routes;