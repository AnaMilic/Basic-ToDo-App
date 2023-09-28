const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "todo", //to do, doing, done
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
