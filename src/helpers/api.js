import axios from 'axios';

axios.defaults.baseURL = '/api/v1';

export const get5Recents = () =>
  axios.get('/get5Recents');

export const submitLink = longUrl =>
  axios.post('/shorten', { longUrl });
