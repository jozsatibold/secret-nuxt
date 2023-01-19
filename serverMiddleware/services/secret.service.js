import { v4 as uuid, validate as uuidValidate } from "uuid";
const { decrypt, encrypt } = require("../utils/encryption")

const Secret = require("../schema/secret.scheme");

export const saveSecret = async (text, expiration) => {
  try {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + expiration);
    const id = uuid();
    const secret = await new Secret({
      secret: encrypt(text, id),
      _id: id,
      createdAt: new Date(),
      expiration: expirationDate,
      limit: 4
    }).save();
    const { _id, limit } = secret;
    return {
      secret: _id,
      expireAfter: expiration,
      expireAfterView: limit
    };
  } catch (error) {
    throw new Error("We have a serious problem, but don't worry, we are working on the fix!");
  }
};
export const getSecret = async (id) => {
  if (!uuidValidate(id)) {
    throw new Error("Secret not found or expired");
  }
  let isExist;
  try {
    isExist = await Secret.findById(id);
  } catch (error) {
    throw new Error("We have a serious database problem, but don't worry, we are working on the fix!");
  }
  if (!isExist) {
    throw new Error("Secret not found or expired");
  }
  if (isExist.limit === 1) {
    await Secret.deleteOne({
      _id: id
    });
  }

  // if expired
  if (isExist.expiration < new Date()) {
    await Secret.deleteOne({
      _id: id
    });
    throw new Error("Secret not found or expired");
  }
  const secretText = decrypt(isExist.secret, id);
  if (isExist.limit > 1) {
    // Decreasing the view limit
    await Secret.findByIdAndUpdate(id, { limit: isExist.limit - 1 });
  }

  return {
    hash: isExist.secret,
    secretText,
    createdAt: isExist.createdAt.getTime(),
    expiresAt: isExist.expiration.getTime(),
    remainingViews: isExist.limit
  };
};
