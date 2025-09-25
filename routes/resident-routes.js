const express = require("express");
const { add_resident, getAllResident, find_resident } = require("../Service/resident-service");
const routes = express.Router();

routes.post("/register_resident", async (req, res) => {
    try {
        const { name, dob, gender, room_number, admission_date, phone_number, email, citizen_identification_card } = req.body;
        const result = await add_resident(name, dob, gender, room_number, admission_date, phone_number, email, citizen_identification_card);
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

routes.get("/all_resident", async (req, res) => {
    try {
        const result = await getAllResident();
        res.status(200).send({
            status: true,
            message: "Lấy danh sách cư dân thành công",
            data: result
        });
    } catch (err) {
        res.status(400).send({
            status: false,
            message: err.message,
        });
    }
})

routes.post("/find_resident", async (req, res) => {
    try {
        const { citizen_identification_card } = req.body;
        const result = await find_resident(citizen_identification_card);
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