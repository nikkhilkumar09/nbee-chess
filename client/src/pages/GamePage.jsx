import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../services/socket';
import useAuthStore from '../store/useAuthStore';
import Board from '../components/Board';

const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export default function GamePage() {
  const { id: gameId } = useParams();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [fen, setFen] = useState(DEFAULT_FEN);
  const [error, setError] = useState('');
  const [gameOver, setGameOver] = useState(null);

  useEffect(() => {
    socket.connect();
    socket.emit('join_game', { gameId, player: { id: user.id, name: user.name } });

    socket.on('game_state', (data) => {
      setGame(data);
      setFen(data.fen);
    });

    socket.on('move_made', (data) => {
      setFen(data.newFen);
      setGame(data.game);
      setError('');
      if (data.isGameOver) {
        setGameOver({
          status: data.isCheckmate ? 'checkmate' : 'draw',
          winner: data.isCheckmate ? (data.turn === 'b' ? 'white' : 'black') : 'draw',
        });
      }
    });

    socket.on('move_error', (err) => setError(err.message));
    socket.on('game_over', (data) => setGameOver(data));

    return () => {
      socket.off('game_state');
      socket.off('move_made');
      socket.off('move_error');
      socket.off('game_over');
      socket.disconnect();
    };
  }, [gameId, user.id, user.name]);

  const playerColor = game?.blackPlayer?.id === user.id ? 'b' : 'w';

  const handleMove = (move) => {
    if (gameOver) return;
    socket.emit('make_move', { gameId, playerId: user.id, move });
  };

  const handleResign = () => {
    socket.emit('resign', { gameId, playerId: user.id });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4 gap-4">
      <div className="flex items-center justify-between w-80 sm:w-96">
        <h1 className="text-xl font-bold">NBee Chess</h1>
        <span className="text-xs text-gray-400">Room: {gameId}</span>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {gameOver && (
        <div className="w-80 sm:w-96 p-3 rounded bg-emerald-900/60 border border-emerald-500 text-center text-sm">
          Game Over — {gameOver.status} (Winner: {gameOver.winner})
        </div>
      )}

      <Board fen={fen} playerColor={playerColor} onMove={handleMove} />

      <div className="flex justify-between w-80 sm:w-96 text-sm text-gray-300">
        <span>White: {game?.whitePlayer?.name || 'Waiting...'}</span>
        <span>Black: {game?.blackPlayer?.name || 'Waiting...'}</span>
      </div>

      <div className="flex gap-3 w-80 sm:w-96">
        {!gameOver && (
          <button
            onClick={handleResign}
            className="flex-1 py-2 bg-red-600 hover:bg-red-500 rounded font-medium cursor-pointer"
          >
            Resign
          </button>
        )}
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded font-medium cursor-pointer"
        >
          Back to Lobby
        </button>
      </div>
    </div>
  );
}
