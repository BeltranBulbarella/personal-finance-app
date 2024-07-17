import axios from 'axios';

const axiosCrypto = axios.create({
  baseURL: 'https://api.binance.com',
});

export default axiosCrypto;
