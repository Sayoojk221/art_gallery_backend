const CryptoJS = require("crypto-js");
const config = require("config")
class Crypto {
    constructor(wagner){
        this.wagner = wagner
    }

    encrypt(value) {
        const key = config.get("secretKey")
        return CryptoJS.AES.encrypt(value, key).toString('base64');
    }

    decrypt(cipherText) {
        const key = config.get("secretKey")
        return CryptoJS.AES.decrypt(cipherText, key).toString('base64');
    }



}

module.exports = (wagner) => wagner.factory("Crypto", () => new Crypto(wagner))