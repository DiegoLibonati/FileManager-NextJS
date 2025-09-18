import axios from "axios";

const isServer = typeof window === "undefined";

const axiosInstance = axios.create({
  baseURL: isServer
    ? process.env.NEXT_API_URL + "/api/v1"
    : "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (isServer) {
    const { cookies } = require("next/headers");

    const token = cookies().get("token");

    if (token) {
      config.headers.Authorization = token.value;
    }

    return config;
  }

  const regex = new RegExp(`(^| )token=([^;]+)`);
  const match = document.cookie.match(regex);
  if (match) {
    config.headers.Authorization = match[2];
  }

  return config;
});

export default axiosInstance;
