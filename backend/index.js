const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user.js');

const port = 8080;

app.use(cors());
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

main()
  .then(() => console.log("MongoDB Connected to FoodHub Database ✅"))
  .catch((err) => console.log("MongoDB connection error ❌", err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/foodhub');
}

app.get('/', (req, res) => {
  res.send("Working!!");
});

app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Missing fields!' });
  }

  const user = await User.findOne({ email, role });

  if (!user) {
    return res.status(400).json({ message: 'Invalid Email, Password, or Role' });
  }

  if (password !== user.password) {
    return res.status(400).json({ message: 'Invalid Email, Password, or Role' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ token });
});

app.post('/register', async (req, res) => {
    try {
      const { fullName, email, phone, address, password, role } = req.body;
  
      if (!fullName || !email || !phone || !password || !role) {
        return res.status(400).json({ message: 'Please fill all required fields!' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered!' });
      }
  
      const newUser = new User({
        fullName,
        email,
        phone,
        address,
        password,
        role
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully!' });
  
    } catch (error) {
      console.error('Registration Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
