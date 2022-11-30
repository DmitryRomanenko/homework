import axios from 'axios';

const baseUrl = 'http://localhost:8080';

const fetchData = async (url, method, data = {}) => {
  try {
    const res = await axios[method](`${baseUrl}/${url}`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.response.status);
  }
};

export default fetchData;
