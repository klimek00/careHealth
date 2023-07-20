const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema({
  owner:  {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
  },
  dayDate:   {
    type: Date,
    required: true
  },
  dayHour:   {
    type: String,
    required: true
  },
  occupied: {
    type: Boolean,
    required: true
  }
})

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit