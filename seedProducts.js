const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://localhost:27017/E-com")//Connects to a local MongoDB instance, specifically to a database named E-com
  .then(async () => { //logs operation async with successfull msg 
    console.log("DB Connected");

    await Product.deleteMany(); // clear old
    await Product.insertMany([
      { name: "Apple iPhone 14", price: 799, description: "Latest iPhone with A15 chip" },
      { name: "Samsung Galaxy S22", price: 699, description: "Flagship Samsung phone" },
      { name: "OnePlus 11", price: 599, description: "Fast and smooth phone" },
    ]);

    console.log("Products added");
    process.exit();//Logs a confirmation message, then exits the process to stop the script cleanly.
  })
  .catch(err => console.log(err));//Catches and logs any errors that occur during the connection or data operations.


