const mongoose = require("mongoose")
const mongoUrl = process.env.BASE_URL;
console.log(mongoUrl);

if (!mongoUrl) {
  console.error('MongoDB connection URL is not provided');
  process.exit(1);
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('MongoDB is connected up');
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
  });
