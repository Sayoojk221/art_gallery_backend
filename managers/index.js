module.exports = function (wagner) {
  wagner.factory("CustomerManager", () => {
    const Manager = require("./CustomerManager");
    return new Manager(wagner);
  });
};
