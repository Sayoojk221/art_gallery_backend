module.exports = function (wagner) {
  wagner.factory("CustomerManager", () => {
    const Manager = require("./CustomerManager");
    return new Manager(wagner);
  });
  wagner.factory("ArtManager", () => {
    const Manager = require("./ArtManager");
    return new Manager(wagner);
  });
};
