import axios from "axios";
import useAuthStore from "@/stores/auth_store";

export const endpoint = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15_000
})

endpoint.interceptors.request.use((config) => {
  const access_token = useAuthStore.getState().accessToken;
  if (access_token && config.headers) config.headers["Authorization"] = `Bearer ${access_token}`;
  return config;
})

// endpoint.interceptors.response.use((response) => response, async (error) => {
//   if (error.response?.status === 401) {

//   }
// });
