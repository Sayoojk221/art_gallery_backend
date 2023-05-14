const moment = require("moment");

const utils = {};
utils.hourDiff = (time) => {
  return moment.duration(moment(time).diff(new Date())).hours();
};

module.exports = (wagner) => wagner.factory("Utils", () => utils);
