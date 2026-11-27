import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { getUserGames } from '../services/gameService';

export default function HomePage() {
  const [roomId, setRoomId] = useState('');
  const [games, setGames] = useState([]);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUserGames()
      .then((data) => setGames(data.games || []))
      .catch(() => {});
  }, []);

  const handleCreateGame = () => {
    const id = Math.random().toString(36).slice(2, 8);
    navigate(`/game/${id}`);
  };

  const handleJoinGame = (e) => {
    e.preventDefault();
    if (roomId.trim()) navigate(`/game/${roomId.trim()}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
      <div className="w-full max-w-sm bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">NBee Chess</h1>
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white cursor-pointer">
            Logout
          </button>
        </div>

        <p className="text-sm text-gray-400">
          Playing as <span className="text-white font-medium">{user?.name || 'Player'}</span>
        </p>

        <button
          onClick={handleCreateGame}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded font-semibold cursor-pointer"
        >
          Create New Game
        </button>

        <form onSubmit={handleJoinGame} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="flex-1 p-2.5 rounded bg-gray-800 border border-gray-700 outline-none"
          />
          <button className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded font-medium cursor-pointer">
            Join
          </button>
        </form>

        {games.length > 0 && (
          <div className="pt-2 border-t border-gray-800 space-y-2">
            <h2 className="text-sm font-semibold text-gray-400">Recent Matches</h2>
            <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs">
              {games.map((g) => (
                <div key={g._id} className="flex justify-between p-2 rounded bg-gray-800/60">
                  <span>{g.whitePlayer?.name} vs {g.blackPlayer?.name}</span>
                  <span className="text-emerald-400 capitalize">{g.winner || g.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
