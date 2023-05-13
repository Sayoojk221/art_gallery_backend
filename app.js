const express = require("express");
const config = require("config");
const wagner = require('wagner-core')
const app = express();
const mongoose = require('mongoose')

//middle_wares
const validateJWT = require('./middleware/validateJWT')
const Error = require("./middleware/ErrorHandler")

require("./models")(wagner)
require("./managers")(wagner)
require("./utils/mailer")(wagner)
require("./utils/crypto")(wagner)

//routers
const authRouter = require("./routes/api/Auth");
const artRouter = require("./routes/api/Arts");


app.use(express.json());

app.use("/api", authRouter);
app.use("/api/art",validateJWT, artRouter);

app.use(Error)

const port = config.get("port");


mongoose.connect(config.get("database.mongodb.connection")).then(() => {
  console.log("Database connected")
  app.listen(port, () => {
    console.log("Listening port: ", port);
  });
  
}).catch(() => console.log("Database connection failed!"))

