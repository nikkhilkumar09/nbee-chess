import { Chess } from 'chess.js';

export const validateAndMakeMove = (fen, move) => {
  try {
    const chess = new Chess(fen);
    const result = chess.move(move);

    return {
      valid: true,
      newFen: chess.fen(),
      san: result.san,
      turn: chess.turn(),
      isCheck: chess.inCheck(),
      isGameOver: chess.isGameOver(),
      isCheckmate: chess.isCheckmate(),
      isDraw: chess.isDraw(),
      moveHistory: chess.pgn(),
    };
  } catch (error) {
    return { valid: false, message: 'Illegal move' };
  }
};
