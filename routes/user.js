const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const router = express.Router();

// POST route for signup (handles form submission from /signup page)
router.post('/', handleUserSignup);

// POST route for login (handles form submission from /login page)
router.post('/login', handleUserLogin);

module.exports = router;