const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Group = require('./models/Group');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const u = await User.findOne({ name: /Adeel Ahmed/i }).populate('groupId');

        if (u) {
            console.log(`User: ${u.name}, Role: ${u.role}`);
            if (u.groupId) {
                console.log(`  Group: ${u.groupId.name}`);
                // Print only keys that are true or contain 'bank'/'account'
                const rights = u.groupId.rights;
                if (rights instanceof Map) {
                    for (let [key, val] of rights) {
                        console.log(`Key: ${key}, Val: ${val}`);
                    }
                } else {
                    // It might be a plain object if not using Map in debug (but schema says Map)
                    // If it comes out as Object from Mongoose lean/populate
                    console.log('Rights keys:', Object.keys(rights || {}));
                    for (let key in rights) {
                        console.log(`  ${key}: ${rights[key]}`);
                    }
                }
            }
        }

        mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
};

checkUsers();
