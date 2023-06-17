const mongoose = require("mongoose");

async function connect(mongoURI) {
  await mongoose.connect(mongoURI).then(() => {
    console.log("Connected");
  });
}

module.exports = connect;
