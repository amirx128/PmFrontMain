import axios from "axios";
import { toast } from "react-toastify";
//@ts-ignore
const appConfig = window?.globalConfig;

let token = localStorage.getItem("atkn");
let user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};
axios.defaults.headers.common["token"] = token;

const axiosInstance = axios.create({
  //@ts-ignore
  baseURL: appConfig?.baseUrl ?? import.meta.env.VITE_BASE_URL,
  data: user ? { userId: user?.id } : {},
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.model == true) {
      toast.success(response.data?.title ?? response.data?.message, {
        toastId: response.data?.statusCode,
      });
    }
    if (!response?.data?.isSuccess && !response?.data?.model) {
      toast.error(response?.data?.message, {
        toastId: response?.data?.status,
      });
    }
    return response;
  },
  (error) => {
    if (
      error?.response?.data?.title ||
      (error?.response?.data?.isSuccess === false &&
        error?.response?.data?.model === false)
    ) {
      toast.error(
        error?.response?.data?.title ?? error?.response?.data?.message,
        {
          toastId: error?.response?.data?.status,
        }
      );
    }
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      console.error("No Response:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
