import axios from 'axios';

const instance = axios.create({
  maxBodyLength: Infinity,
  baseURL: 'http://localhost:3001',
  headers: {
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Connection: 'keep-alive',
    DNT: '1',
    Origin: 'http://localhost:3001',
  },
});

export default instance;
