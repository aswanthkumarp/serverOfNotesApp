const mongoose = require('mongoose');
require('dotenv').config();
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster69.smffsae.mongodb.net/?retryWrites=true&w=majority`
const run = async () => {
  try {
    await mongoose.connect(uri);
    console.log('You have successfully connected to MongoDB!');
  } catch (error) {
    console.error(error);
  }
};
module.exports = run;
