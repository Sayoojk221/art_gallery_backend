
class UserManager {
  constructor(wagner) {
    this.wagner = wagner;
    // this.user = this.wagner.get("user");
  }

  createNewUser() {
    return new Promise((resolve,reject) => {
        resolve("create new user!")
    })
  }
}

module.exports = UserManager;
