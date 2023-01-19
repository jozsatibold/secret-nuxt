const crypto = require("crypto");


export const encrypt = (text, iv) => {
  const algorithm = "aes-256-cbc";
  const cipher = crypto.createCipheriv(
    algorithm,
    process.env.ENCRYPT_KEY || "c63c2c1a76653f6178ef9ff3a8748abe",
    Buffer.from(iv.replace(/-/g, ""), 'hex')
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

export const decrypt = (encryptedText, iv) => {
  const algorithm = "aes-256-cbc";
  const key = process.env.ENCRYPT_KEY || "c63c2c1a76653f6178ef9ff3a8748abe";
  const ivBf = Buffer.from(iv.replace(/-/g, ""), "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, ivBf);
  let decrypted = decipher.update(Buffer.from(encryptedText, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
