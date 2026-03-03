// Import express
const express = require("express");
const app = express();

// Import Customer model
require("./Customer");

// Import mongoose
const mongoose = require("mongoose");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(function(req, res, next){
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//     next()
// })

// Connect to MongoDB
const uri = "mongodb+srv://houdaifazaidi04_db_user:xmWwoqrHcc1SakEo@cluster0.pufzrga.mongodb.net/?appName=Cluster0";

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection failed", err));

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to customers service");
});

// Get Customer model
const Customer = mongoose.model("Customer");

// Add new customer
app.post("/customer", (req, res) => {

  const newCustomer = {
    name: req.body.name,
    email: req.body.email
  };

  const customer = new Customer(newCustomer);

  customer.save()
    .then(() => {
      console.log("Customer created");
      res.json({ message: "New customer added" });
    })
    .catch(err => {
      res.status(500).json({ error: "Error creating customer" });
    });

});

// Get all customers
app.get("/customers", (req, res) => {

  Customer.find()
    .then(customers => {
      res.json({ customers: customers });
    })
    .catch(err => {
      res.status(500).json({ error: "Error fetching customers" });
    });

});

// Get customer by id
app.get("/customers/:id", (req, res) => {

  Customer.findById(req.params.id)
    .then(customer => {
      if (customer) {
        res.json({ customer: customer });
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Invalid ID" });
    });

});

// Delete customer by id
app.delete("/customers/:id", (req, res) => {

  Customer.findByIdAndDelete(req.params.id)
    .then((deletedCustomer) => {

      if (!deletedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json({ message: "Customer deleted" });

    })
    .catch(err => {
      res.status(500).json({ error: "Error deleting customer" });
    });

});

// Start server
// app.listen(2222, () => {
//   console.log("Server running on port 2222");
// });

module.exports = app