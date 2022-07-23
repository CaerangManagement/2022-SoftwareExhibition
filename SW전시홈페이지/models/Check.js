const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');

const CheckSchema = new Schema({
    id: {//post_id + user_id
      type: String,
      required: true,
    },
    isLiked : {
      type: Boolean,
      required: true,
    }
});

module.exports = mongoose.model('Check', CheckSchema);