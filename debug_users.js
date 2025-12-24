const mongoose = require('mongoose');
require('dotenv').config({ path: './Backend/.env' });
const User = require('./Backend/models/User');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        const users = await User.find({}, 'name email role isActive');
        console.log('Users:', JSON.stringify(users, null, 2));
        mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
};

checkUsers();
