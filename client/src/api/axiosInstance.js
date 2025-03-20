import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2800/api",
  withCredentials: true,
});

export default API;
