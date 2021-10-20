import mongoose from 'mongoose';

export const playerSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
 image: { //filePath
    type: String
  }
});

export const Player = mongoose.model('Player', playerSchema);