import { createGame, joinGame, getGame, makeMove, endGame } from '../services/gameService.js';

export const registerGameHandlers = (io, socket) => {
  socket.on('join_game', ({ gameId, player }) => {
    let game = getGame(gameId);

    if (!game) {
      game = createGame(gameId, player);
    } else if (!game.blackPlayer && game.whitePlayer?.id !== player.id) {
      game = joinGame(gameId, player);
    }

    socket.join(gameId);
    io.to(gameId).emit('game_state', game);
  });

  socket.on('make_move', async ({ gameId, playerId, move }) => {
    const result = await makeMove(gameId, playerId, move);

    if (!result.valid) {
      return socket.emit('move_error', { message: result.message });
    }

    io.to(gameId).emit('move_made', result);
  });

  socket.on('resign', async ({ gameId, playerId }) => {
    const game = getGame(gameId);
    if (!game) return;

    const winner = game.whitePlayer?.id === playerId ? 'black' : 'white';
    await endGame(gameId, 'resigned', winner);
    io.to(gameId).emit('game_over', { status: 'resigned', winner });
  });
};
