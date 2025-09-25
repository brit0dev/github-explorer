import axios from 'axios';

type AxiosData = {
  baseURL: string;
  headers?: { get: { Authorization: string } };
};

const githubApiKey: string = '';

const data: AxiosData = {
  baseURL: 'https://api.github.com',
};

if (githubApiKey && githubApiKey.trim() !== '')
  data.headers = {
    get: {
      Authorization: githubApiKey,
    },
  };

const api = axios.create(data);

export default api;
