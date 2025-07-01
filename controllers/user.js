const User = require("../models/user");
const { v4: uuidv4} = require('uuid');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    
    try {
        await User.create({
            name,
            email,
            password,
        });
        // Redirect to login page after successful signup
        return res.redirect("/login");
    } catch (error) {
        console.error("Signup error:", error);
        // Check if it's a duplicate email error
        if (error.code === 11000) {
            return res.render("signup", {
                error: "Email already exists. Please use a different email."
            });
        }
        // For other errors
        return res.render("signup", {
            error: "Error creating account. Please try again."
        });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.render("login", {
                error: "Invalid Username or Password",
            });
        }
        
        const token = setUser(user);
        res.cookie("token", token);
        return res.redirect("/");
    } catch (error) {
        console.error("Login error:", error);
        return res.render("login", {
            error: "An error occurred during login. Please try again."
        });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}