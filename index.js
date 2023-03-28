const express = require("express");
const config = require("config");
const app = express();

const Authorization = require('./middleware/Authorization')

//routers
const authRouter = require("./routes/api/Auth");
const artRouter = require("./routes/api/Arts");

//middlewares
app.use(express.json());
app.use(Authorization)

//routes
app.use("/api", authRouter);
app.use("/api/art", artRouter);

//config
const port = config.get("port");

app.listen(port, () => {
  console.log("Listening port: ", port);
});
