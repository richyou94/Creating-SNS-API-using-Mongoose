const { Thought, User } = require("../models");

const thoughtController = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //get single thought using id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "no thought with that ID" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "no thought with that ID" })
          : User.deleteMany({ _id: { $in: thought.users } })
      )
      .then(() => res.json({ message: "Thought and Users deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  //remove thought id from user's thoughts' field

  // add reaction to thought

  // remove reaction from thought
};

module.exports = thoughtController;
