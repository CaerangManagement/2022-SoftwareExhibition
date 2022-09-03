const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role : {
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('User', UserSchema);
