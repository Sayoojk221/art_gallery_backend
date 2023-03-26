const express = require("express");
const config = require("config");
const app = express();

//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

//config
const port = config.get("port");

app.listen(port, () => {
  console.log("Listening port: ", port);
});
