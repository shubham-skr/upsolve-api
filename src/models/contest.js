const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String, 
      required: true,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    solve: [String],
    upsolve: [String],
    note: {
      type: String,
      trim: true,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest;
