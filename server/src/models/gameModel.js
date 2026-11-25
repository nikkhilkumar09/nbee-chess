import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    whitePlayer: {
      id: { type: String, default: null },
      name: { type: String, default: 'Guest' },
    },
    blackPlayer: {
      id: { type: String, default: null },
      name: { type: String, default: 'Guest' },
    },
    moveHistory: {
      type: String,
      default: '', // Stores all moves as text (e.g. "1. e4 e5 2. Nf3")
    },
    status: {
      type: String,
      enum: ['in_progress', 'checkmate', 'draw', 'resigned', 'timeout'],
      default: 'in_progress',
    },
    winner: {
      type: String,
      enum: ['white', 'black', 'draw', null],
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Game', gameSchema);
