const express = require("express");
const config = require("config");
const wagner = require("wagner-core");
const app = express();
const mongoose = require("mongoose");

//middle_wares
const Error = require("./middleware/ErrorHandler");

require("./models")(wagner);
require("./managers")(wagner);
require("./utils/mailer")(wagner);
require("./utils/crypto")(wagner);
require("./utils/utils")(wagner);

const apiRoutes = require("./routes/api");
const commonRoutes = require("./routes/common")
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

app.use("/api", apiRoutes);
app.use("/",commonRoutes)
app.use(Error);

const port = config.get("port");

mongoose
  .connect(config.get("database.mongodb.connection"))
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log("Listening port: ", port);
    });
  })
  .catch(() => console.log("Database connection failed!"));
