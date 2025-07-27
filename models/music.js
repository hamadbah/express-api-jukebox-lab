const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  }
});

const Music = mongoose.model('Music', musicSchema);
module.exports = Music;