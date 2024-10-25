import axios, { AxiosRequestConfig } from "axios";

const API_URL = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data?: T;
  message?: string;
}

const normalizeSuccess = <T>(response: any): ApiResponse<T> => ({
  success: true,
  status: response.status,
  data: response.data,
});

const normalizeError = <T>(error: any): ApiResponse<T> => ({
  success: false,
  status: error.response?.status || 500,
  message: error.response?.data?.detail || "An error occurred.",
});

export const getQuery = async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.get<T>(endpoint, config);
    return normalizeSuccess(response);
  } catch (error) {
    return normalizeError(error);
  }
};

export const postQuery = async <T, U>(endpoint: string, data: U, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.post<T>(endpoint, data, config);
    return normalizeSuccess(response);
  } catch (error) {
    return normalizeError(error);
  }
};
