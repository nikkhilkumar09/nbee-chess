import Game from '../models/gameModel.js';
import { validateAndMakeMove } from './chessService.js';

const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const activeGames = new Map();

export const createGame = (gameId, player) => {
  const game = {
    gameId,
    whitePlayer: player,
    blackPlayer: null,
    fen: DEFAULT_FEN,
    turn: 'w',
    status: 'waiting',
    winner: null,
    moveHistory: '',
  };
  activeGames.set(gameId, game);
  return game;
};

export const joinGame = (gameId, player) => {
  const game = activeGames.get(gameId);
  if (!game || game.blackPlayer) return null;

  game.blackPlayer = player;
  game.status = 'in_progress';
  return game;
};

export const getGame = (gameId) => activeGames.get(gameId) || null;

export const makeMove = async (gameId, playerId, move) => {
  const game = activeGames.get(gameId);
  if (!game || game.status !== 'in_progress') {
    return { valid: false, message: 'Game not active' };
  }

  const expectedId = game.turn === 'w' ? game.whitePlayer?.id : game.blackPlayer?.id;
  if (expectedId !== playerId) {
    return { valid: false, message: 'Not your turn' };
  }

  const result = validateAndMakeMove(game.fen, move);
  if (!result.valid) return result;

  game.fen = result.newFen;
  game.turn = result.turn;
  game.moveHistory = result.moveHistory;

  if (result.isGameOver) {
    const status = result.isCheckmate ? 'checkmate' : 'draw';
    const winner = result.isCheckmate ? (result.turn === 'b' ? 'white' : 'black') : 'draw';
    await endGame(gameId, status, winner);
  }

  return { ...result, game };
};

export const endGame = async (gameId, status, winner) => {
  const game = activeGames.get(gameId);
  if (!game) return null;

  game.status = status;
  game.winner = winner;

  const saved = await Game.create({
    whitePlayer: game.whitePlayer,
    blackPlayer: game.blackPlayer,
    moveHistory: game.moveHistory,
    status: game.status,
    winner: game.winner,
  });

  activeGames.delete(gameId);
  return saved;
};
