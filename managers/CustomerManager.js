const BaseManager = require("./BaseManager");
const {messages} = require("../helper/constants")
class CustomerManager extends BaseManager {
  constructor(wagner) {
    super(wagner.get("Customer"));
    this.wagner = wagner;
  }

  createNewUser(option) {
    return new Promise(async (resolve, reject) => {
      try {
        const isExist = await this._findOne({ email: option.email });
        if (isExist) return reject(new Error("Customer already exist!"));
        const customer = await this._createNew(option);
        resolve(customer);
      } catch (error) {
        reject(error);
      }
    });
  }

  loginCustomer(option) {}

  verifyCustomer(email) {
    return new Promise(async (resolve, reject) => {
      const customer = await this._findOne({ email });
      if (!customer) return reject(new Error(messages.invalidToken));
      if (customer.isEmailVerified)
        return reject(new Error("Account already verified."));
      await this._updateOne({ email },{isEmailVerified: true});

      resolve({ success: "Your account has verified." });
    });
  }
}

module.exports = CustomerManager;
