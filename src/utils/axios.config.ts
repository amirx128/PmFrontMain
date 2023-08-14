import axios from 'axios';
import {toast} from "react-toastify";

let token = localStorage.getItem('atkn');
let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
axios.defaults.headers.common['token'] = token;
console.log(user ? 'h' : 'v');
const axiosInstance = axios.create({
    baseURL: 'http://46.225.237.138:33004',
    data: user ? {userId: user?.id} : {}
});

axiosInstance.interceptors.response.use(
  response => {
      if(response.data?.model == true){
          toast.error(response.data?.title,{
              toastId: response.data?.message
          });
      }
      return response;
  },
  error => {
    if(error?.response?.data?.title){
        toast.error(error?.response?.data?.title,{
            toastId: error?.response?.data?.status
        });
    }
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      console.error('No Response:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;