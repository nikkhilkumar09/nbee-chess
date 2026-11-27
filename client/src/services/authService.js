import api from './api';

export const signup = (data) => api.post('/auth/signup', data).then((res) => res.data);
export const signin = (data) => api.post('/auth/signin', data).then((res) => res.data);
export const guestLogin = () => api.post('/auth/guest').then((res) => res.data);
