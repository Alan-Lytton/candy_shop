const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User Schema
const UserSchema = new mongoose.Schema({
    // email column
    email:{
        type: String,
        required: [true, "An email is required!"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email!"
        }
    },
    // password column
    password: {
        type: String,
        required: [true, "A password is required!"],
        minlength: [8,, "Passwords must be at least 8 characters!"]
    }
}, {timestamps: true});

// Password Confirm
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

// Password Confirm Validation
UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match!");
    }
    next();
});

// Hash the BCRYPT and Salt the password
UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash =>
        {this.password = hash;
        next();
    });
});

module.exports = mongoose.model("User", UserSchema)