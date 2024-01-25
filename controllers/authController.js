const bcrypt = require("bcrypt");

const { generateToken } = require("../services/authService.js");
const { User } = require("../models/user.js");



// Login function

const loginUser = async (req, res) => {
  try {
    const userEmail = req.body.email;

    const user = await User.findOne({
      where: { email: userEmail },
    });

    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        return res.status(401).send("Incorrect Password!");
      }

      const token = generateToken(user);
      
      res.cookie("auth-token", token, { maxAge: 1000000, httpOnly: true });
      res.status(200).send({
        message: `Login Successful with ${user.email} `,
        token: token,
      });
    } else {
      const err = `Email : ${userEmail} NOT FOUND`;
      console.log(err);
      res.status(400).send(err);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { loginUser };
