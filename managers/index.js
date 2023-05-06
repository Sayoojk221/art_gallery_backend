module.exports = function (wagner) {
  wagner.factory("UserManager", () => {
    const UserManager = require("./UserManager");
    return new UserManager(wagner);
  });
};
