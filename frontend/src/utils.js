import { toast } from "react-toastify";

export const notify = (message, type) => {
  toast[type](message);
};

export const API_URL = process.env.REACT_APP_BACKEND_URL;
