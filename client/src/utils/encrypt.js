var CryptoJS = require("crypto-js");

// Encrypt
const cipherText = (textInput) => {
  let encryptedString = CryptoJS.AES.encrypt(textInput, 'secret key 123').toString();
  return encryptedString;
};

// Decrypt
const decryptText = (storedData) => {
  let decryptedBytes = CryptoJS.AES.decrypt(storedData, 'secret key 123');
  let decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedString;
};

module.exports = {
  cipherText,
  decryptText,
};



