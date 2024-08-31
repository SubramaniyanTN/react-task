import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9000",
  timeout: 10000,
});

export default api;
