const express = require("express");
const { create } = require("../controllers/admin.controllers");

const router = express.Router();

router.post("/create", create);

module.exports = router;
