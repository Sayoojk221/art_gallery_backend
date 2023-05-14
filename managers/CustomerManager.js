const uuid = require("uuid");
const moment = require("moment");

const BaseManager = require("./BaseManager");
const { messages } = require("../helper/constants");
class CustomerManager extends BaseManager {
  constructor(wagner) {
    super(wagner.get("Customer"));
    this.wagner = wagner;
  }

  createNewUser(option) {
    return new Promise((resolve, reject) => {
      this._findOne({ email: option.email })
        .then(async (customer) => {
          try {
            if (customer) return reject(new Error("Customer already exist!"));
            const newCustomer = await this._createNew(option);
            resolve(newCustomer);
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => reject(error));
    });
  }

  initiateLogin(option) {
    return new Promise((resolve, reject) => {
      this._findOne({ email: option.email })
        .then(async (customer) => {
          try {
            if (!customer)
              return reject(new Error("Invalid login credentials."));
            const token = await this.wagner
              .get("Login2Fa")
              .findOne({ customerId: customer.id });

            if (token) {
              const expired =
                this.wagner.get("Utils").hourDiff(token.expire) <= 0;

              if (!expired)
                return reject(
                  new Error(
                    "Last created login link still active, please check your inbox."
                  )
                );
            }

            const newToken = await new this.wagner.get("Login2Fa")({
              customerId: customer.id,
              expire: moment(new Date()).add(1, "days"),
              token: uuid.v4(),
            }).save();

            resolve({ token: newToken.token, ...customer.toJSON() });
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => reject(error));
    });
  }

  verifyCustomer(email) {
    return new Promise((resolve, reject) => {
      this._findOne({ email })
        .then(async (customer) => {
          try {
            if (!customer) return reject(new Error(messages.invalidToken));
            if (customer.isEmailVerified)
              return reject(new Error("Account already verified."));
            await this._updateOne({ email }, { isEmailVerified: true });

            resolve({ success: "Your account has verified." });
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => reject(error));
    });
  }

  verifyLogin(token) {
    return new Promise((resolve, reject) => {
      this.wagner
        .get("Login2Fa")
        .findOne({ token })
        .then(async (details) => {
          try {
            if (!details) return reject(new Error(messages.invalidToken));
            const expired = this.wagner.get("Utils").hourDiff(details.expire) <= 0;
            if (expired)
              return reject(
                new Error("Login link has expired, please try to login again")
              );
            const customer = await this._findOne({ _id: details.customerId });

            resolve(customer.toJSON());
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = CustomerManager;
