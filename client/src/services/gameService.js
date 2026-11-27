import api from './api';

export const getUserGames = () => api.get('/games').then((res) => res.data);
export const getGameById = (id) => api.get(`/games/${id}`).then((res) => res.data);
