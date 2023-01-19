const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://nuxtuser:PYHFsnj5FJUd2@cluster0.gbizrue.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))
export default mongoose;
