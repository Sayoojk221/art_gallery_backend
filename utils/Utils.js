const moment = require("moment");
const fs = require("fs");
const utils = {};
utils.hourDiff = (time) => {
  return moment.duration(moment(time).diff(new Date())).hours();
};


utils.removeUploadedFile = (fileId, commonFolder = "uploads/") => {
  fs.unlink(`${commonFolder}${fileId}`, (err) => {
    if(err) {
      console.log("Error while remove uploaded file: " + err)
    }
  });
};

module.exports = (wagner) => wagner.factory("Utils", () => utils);
