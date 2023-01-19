import {v4 as uuid, validate as uuidValidate} from 'uuid';
const Secret = require('../schema/secret.scheme');

export const saveSecret = async (text, expiration) => {
  try {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getHours() + expiration);
    const secretData = {
      secret: text,
      _id: uuid(),
      createdAt: new Date(),
      expiration,
      limit: 4
    };
    await new Secret(secretData).save();
    const {_id, limit} = secretData;
    return {
      secret: _id,
      expireAfter: expiration,
      expireAfterView: limit
    };
  } catch (error) {
    throw new Error('We have a serious problem, but don\'t worry, we are working on the fix!')
  }
};
export const getSecret = async (id) => {
  if (!uuidValidate(id)) {
    throw new Error('Secret not found or expired');
  }
  let isExist;
  try {
    isExist = await Secret.findById(id);
  } catch (error) {
    throw new Error('We have a serious database problem, but don\'t worry, we are working on the fix!')
  }
  if (!isExist) {
    throw new Error('Secret not found or expired');
  }
  if (isExist.limit === 1) {
    await Secret.deleteOne({
      _id: id
    })
  }

  // if expired
  if (isExist.expiration < new Date()) {
    await Secret.deleteOne({
      _id: id
    })
    throw new Error('Secret not found or expired');
  }

  if (isExist.limit > 1) {
    // Decreasing the view limit
    await Secret.findByIdAndUpdate(id, {limit: isExist.limit - 1})
  }

  return {
    hash: isExist.secret,
    secretText: isExist.secret,
    createdAt: isExist.createdAt,
    expiresAt: isExist.expiration,
    remainingViews: isExist.limit
  };
};
