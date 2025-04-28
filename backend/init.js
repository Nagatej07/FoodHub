const mongoose = require('mongoose');
const User = require('./models/user.js');  // Assuming you created the correct User model I explained earlier

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/foodhub');
    console.log("MongoDB Connected to FoodHub Database ✅");

    await User.insertMany([
        {
            email: "hostelstudent1@example.com",
            password: "password123",
            role: "Hostel Student"
        },
        {
            email: "hosteladmin1@example.com",
            password: "admin123",
            role: "Hostel Admin"
        },
        {
            email: "sevak1@example.com",
            password: "sevak123",
            role: "Sevak"
        },
        {
            email: "otheruser1@example.com",
            password: "other123",
            role: "Others"
        }
    ]);

    console.log("Dummy users added successfully ✨");
}

main().catch((err) => {
    console.log("Error connecting to MongoDB ❌");
    console.log(err);
});
