const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
  userid:  {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  contact: {
    type: [String],
    required: true
  },
  price: {
    type: String
  },
  speicalty: [String]
})

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
module.exports = Visit