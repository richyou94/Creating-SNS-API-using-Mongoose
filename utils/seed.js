const connection = require("../config/connection");
const { User, Thought } = require("../models");
const userData = require("./userData.json");
const thoughtData = require("./thoughtsData.json");
const { createThought } = require("../controllers/thoughtController");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});

    
  userData.forEach((data) => {
    User.create(data);
  });

//   thoughtData.forEach((data) => {
//     Thought.create(data);
//   });
  await Thought.collection.insertMany(thoughtData);

    // await User.collection.insertMany(userData);

  const thoughts = await Thought.find();

  thoughts.forEach((thought) => {
    User.findOneAndUpdate(
      { username: thought.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
  });

  console.table(thoughtData);
  console.table(userData);

  console.info("Seeding complete!");
  process.exit(0);
  // await User.collection.insertMany(users);

  // await Thought.collection.insertOne({

  // })
});
