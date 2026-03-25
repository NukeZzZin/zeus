import axios from "axios";
import useAuthStore from "@/stores/auth_store";

import type { InternalAxiosRequestConfig } from "axios";

export type RegisterType = { username: string; email: string; display_name: string; password: string };
export type LoginType = { identifier: string; password: string };
export type CreatePostType = { title: string; content: string };

export type SuccessResultType<T> = { success: true; data?: T };
export type InternalErrorType = { code: number; message: string, fields?: string };
export type ErrorResultType = { success: false; errors: InternalErrorType[] };
export type EndpointResult<T> = SuccessResultType<T> | ErrorResultType;

export type SessionResultType = { access_token: string; refresh_token: string };
export type PostResultType = { post_id: string; title: string; content: string; author_id: string };

export const endpoint = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api` || "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15_000
})

interface RetryableRequestConfig extends InternalAxiosRequestConfig { _retry?: boolean }

const applyAccessToken = (config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken && config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
};

const executeRefresh = async (refreshToken: string): Promise<void> => {
  const { setTokenTuple, clearTokenTuple } = useAuthStore.getState();
  const result = await routes.session.refresh(refreshToken);
  if (result.success && result.data) {
    setTokenTuple(result.data.access_token, result.data.refresh_token);
  } else {
    clearTokenTuple();
    throw new Error("Refresh failed");
  }
};


let proactiveRefreshPromise: Promise<void> | null = null;

endpoint.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const state = useAuthStore.getState();

  if (state.accessToken && state.refreshToken && state.accessTokenExpiresAt && state.accessTokenExpiresAt - Date.now() < 60_000) {
    proactiveRefreshPromise ??= executeRefresh(state.refreshToken)
      .finally(() => { proactiveRefreshPromise = null; });

    try { await proactiveRefreshPromise; }
    catch { /* Se falhar, segue sem token (vai cair no 401 no response interceptor) */ }
  }

  applyAccessToken(config);
  return config;
});

let reactiveRefreshPromise: Promise<void> | null = null;

endpoint.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableRequestConfig;

    if (!axios.isAxiosError(error) || error.response?.status !== 401 || originalRequest._retry) return Promise.reject(error);

    originalRequest._retry = true;

    const { refreshToken } = useAuthStore.getState();
    if (!refreshToken) return Promise.reject(error);

    reactiveRefreshPromise ??= executeRefresh(refreshToken)
      .finally(() => { reactiveRefreshPromise = null; });

    try { await reactiveRefreshPromise; }
    catch { return Promise.reject(error); }

    const { accessToken } = useAuthStore.getState();
    if (!accessToken) return Promise.reject(error);

    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return endpoint(originalRequest);
  }
);

const unwrap = async <T>(promise: Promise<any>): Promise<EndpointResult<T>> => {
  try {
    const result = await promise;
    const data = result.data?.data ?? result.data;
    return { success: true, data } as EndpointResult<T>;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errors = error.response.data?.errors ??
        (error.response.data ?
          [{ code: error.response.status, message: error.response.data.message }] :
          [{ code: error.response.status, message: "Unknown error" }]);
      return { success: false, errors } as EndpointResult<T>;
    }
    return { success: false, errors: [{ code: 500, message: "Internal server error" }] } as EndpointResult<T>;
  }
};

export const routes = {
  auth: {
    register: (payload: RegisterType) => unwrap<SessionResultType>(endpoint.post("/v1/auth/register", payload)),
    login: (payload: LoginType) => unwrap<SessionResultType>(endpoint.post("/v1/auth/login", payload))
  },

  session: {
    refresh: (refresh_token: string) => unwrap<SessionResultType>(endpoint.post("/v1/session/refresh", { refresh_token })),
    logout: (refresh_token: string) => unwrap<string>(endpoint.post("/v1/session/logout", { refresh_token }))
  },

  posts: {
    list: () => unwrap<PostResultType[]>(endpoint.get("/v1/posts")),
    get: (identifier: string) => unwrap<PostResultType>(endpoint.get(`/v1/posts/${identifier}`)),
    create: (payload: CreatePostType) => unwrap<PostResultType>(endpoint.post("/v1/posts/create", payload))
  },

  users: {
    posts: (identifier: number) => unwrap<PostResultType[]>(endpoint.get(`/v1/users/${identifier}/posts`))
  }
};
