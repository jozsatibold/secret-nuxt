import mongoose from '../db/db.config';

const SecretScheme = new mongoose.Schema({
  // Expiration time
  expiration: Date,
  // Creation date
  createdAt: Date,
  // Unique id (UUID4) which is the secret
  _id: String,
  // Number of download possibilities
  limit: Number,
  // Hashed text
  secret: String,
})

const Secret = mongoose.model('Secret', SecretScheme)

module.exports = Secret;
