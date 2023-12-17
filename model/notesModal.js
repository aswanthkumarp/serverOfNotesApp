const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
   
  },
  createdAt: {
    type: Date,
    
  },
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
