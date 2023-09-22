import axios from "axios";
import { toast } from 'react-toastify'

const baseURL = process.env.REACT_APP_BASE_URL;
// const baseURL = 'http://localhost:8000/v1/'

const api = (url = "", method, data = {}) => {
  const options = {
    method,
    headers: {
      "content-type": "application/json",
      token: `${localStorage.getItem("token")}`,
    },
    data,
    url: `${baseURL}${url}`,
  };
  return axios(options);
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Display toast message and redirect to login
      toast.success('Session Expired!! Please login again')
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;
