const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData.json');
const thoughtData = require('./thoughtsData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    await Thought.collection.insertMany(thoughtData)

    await User.collection.insertMany(userData);

    console.table(thoughtData);
    console.table(userData);

    console.info('Seeding complete!');
    process.exit(0);
    // await User.collection.insertMany(users);

    // await Thought.collection.insertOne({

    // })
})