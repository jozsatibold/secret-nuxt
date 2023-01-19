const CryptoJS = require("crypto-js");

export const encrypt = (text, iv) => {
  const data = text.slice();
  const key = process.env.ENCRYPT_KEY || "c63c2c1a76653f6178ef9ff3a8748abe"
  const encryptedString = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encryptedString.toString();
};

export const decrypt = (encryptedText, iv) => {
  const key = process.env.ENCRYPT_KEY || "c63c2c1a76653f6178ef9ff3a8748abe"
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8)
};
