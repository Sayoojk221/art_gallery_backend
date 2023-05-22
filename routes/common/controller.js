const controllers = {};
const path = require("path");
controllers.serveUploads = (req, res) => {
  res.sendFile(path.join(__dirname, `../../uploads/${req.params.name}`));
};

module.exports = controllers;
