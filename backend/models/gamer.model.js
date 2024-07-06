const mongoose = require("mongoose");

const gamerSchema = mongoose.Schema(
  {
    gamertag: {
      type: String,
      required: false,
      default: "Anonymus",
    },

    name: {
      type: String,
      require: [true, "Please enter user name"],
    },

    age: {
      type: Number,
      required: false,
      default: 0,
    },

    nationality: {
      type: String,
      required: false,
      default: "Anonymus",
    },

    gender: {
      type: String,
      required: false,
      default: "Male/ Female",
    },

    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const gamerModel = mongoose.model("gamers", gamerSchema);

module.exports = gamerModel;
