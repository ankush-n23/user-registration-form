const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to handle registration form submission
app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            console.log(err);
            res.send('Error occurred during registration.');
        } else {
            res.send('Registration successful!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
