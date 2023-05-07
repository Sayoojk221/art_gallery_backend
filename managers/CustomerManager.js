const BaseManager = require('./BaseManager')

class CustomerManager extends BaseManager {
  constructor(wagner) {
    super(wagner.get("Customer"))
    this.wagner = wagner;
  }

  createNewUser(option) {
    return new Promise(async (resolve,reject) => {
      try {
        const isExist = await this._findOne(option)
        if(isExist) return reject(new Error("Customer already exist!"))
        const customer = await this._createNew(option)
        resolve(customer)
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = CustomerManager;
