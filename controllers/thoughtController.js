const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // /api/thoughts - get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // /api/thoughts/:thoughtId - get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // /api/thoughts - create a new thought
  createThought(req, res) {
    Thought.create()
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({message: 'Thought created, but found no user with that id.'})
          : res.json('Created the thought')
      )
      .catch((err) => res.status(500).json(err));
  },
  // /api/thoughts/:thoughtId - Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({message: 'No thought with this id.'})
          : res.json(thought)
      )
      .then((err) => res.status(500).json(err));
  },
  // /api/thoughts/:thoughtId - Delete a thought by its id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with this id.'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // /api/thoughts/:thoughtId/reactions - Add a reaction to a thought
  addReaction(req, res) { 
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // /api/thoughts/:thoughtId/reactions/reactionId - Delete a reaction using the param reactionId in a thought.
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};