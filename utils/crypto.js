const CryptoJS = require("crypto-js");
const config = require("config")
class Crypto {
    constructor(wagner){
        this.wagner = wagner
    }

    encrypt(value) {
        const key = config.get("secretKey")
        const encoded = CryptoJS.AES.encrypt(value, key).toString()
        return encoded.toString().replace('/','!');
    }

    decrypt(cipherText) {
        const key = config.get("secretKey")
        const decode = cipherText.toString().replace("!","/")
        const bytes = CryptoJS.AES.decrypt(decode, key)
        return bytes.toString(CryptoJS.enc.Utf8);
    }



}

module.exports = (wagner) => wagner.factory("Crypto", () => new Crypto(wagner))