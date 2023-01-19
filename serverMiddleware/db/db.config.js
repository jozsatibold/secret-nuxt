const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))
export default mongoose;
