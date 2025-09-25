const express = require('express');
const cors = require("cors");
require("dotenv").config();

const create_table=require("./database/create_table");
const user_routes=require("./routes/user_routes");
const app=express();
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
create_table();
app.use("/api/auth",user_routes);
app.listen(process.env.POST,process.env.HOST,()=>console.log(`Server đang chạy tại http://${process.env.HOST}:${process.env.POST}`));