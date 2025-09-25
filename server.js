const express = require('express');
const cors = require("cors");
require("dotenv").config();
const { sequelize, connectDB } = require('./Config/database');
const app=express();
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use("/api/auth", require("./routes/user-routes"));

app.use("/api/resident", require("./routes/resident-routes"));

connectDB().then(() => {
  sequelize.sync({ alter: true })
    .then(() => console.log('✅ Đã đồng bộ database'))
    .catch(err => console.error('❌ Có lỗi khi đồng bộ database:', err));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {  
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});