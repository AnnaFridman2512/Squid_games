import mongoose from 'mongoose';

export const playerSchema = new mongoose.Schema({
  name: {
    type: Number,
    required: true
  },
 score: {
    type: Number
  }
});

export const Player = mongoose.model('Player', playerSchema);