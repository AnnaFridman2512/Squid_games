import mongoose from 'mongoose';

export const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 winsCount: {
    type: Number
  },
});

export const Player = mongoose.model('Player', playerSchema);