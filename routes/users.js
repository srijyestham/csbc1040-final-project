const express = require("express");
const router = express.Router();



const {
  getUsers,
  getUserById,
  addNewUser,
} = require("../controllers/userController.js");


router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", addNewUser);

module.exports = router;
