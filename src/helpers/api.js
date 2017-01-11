import axios from 'axios';

axios.defaults.baseURL = '/api/v1';

export const getTop5 = () =>
  axios.get('/getTop5');

export const submitLink = longUrl =>
  axios.post('/shorten', { longUrl });
