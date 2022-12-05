const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    const users = [];

    for (let i = 0; i < 20; i++) {
        const thoughts = getRandomThoughts(3);
        const name = getRandomName();
        const username = `${name}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`
        const email =  `${username}@gmail.com`;
        const friends = [];
        for (let i = 0; i < 5; i++) {
            const friend = getRandomName();
            friends.push(friend);
        }
        users.push({
            username,
            email,
            thoughts,
            friends
        })
    }

    await User.collection.insertMany(users);

    await Thought.collection.insertOne({

    })
})