import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';

function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/game/:id" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
