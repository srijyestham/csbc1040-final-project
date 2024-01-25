const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.port || 3000;
const authRoute = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const someMiddleware = require("./middleware/middlewares.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", authRoute);
app.use(cookieParser());
app.use(someMiddleware);
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Application running in port ${port}`));

module.exports = {app};
