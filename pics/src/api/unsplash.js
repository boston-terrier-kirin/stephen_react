import axios from 'axios';
import { environment } from '../environment';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${environment.accessKey}`,
  },
});
