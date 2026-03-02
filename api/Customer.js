const mongoose = require("mongoose");

mongoose.model("Customer", {
    // name  -   email
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
                           
});
