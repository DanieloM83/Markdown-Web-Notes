import axios, { AxiosRequestConfig } from "axios";

API_URL = "127.0.0.1/"

const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

const getQuery = async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
	const response = await axiosInstance.get<T>(endpoint, config);
	return response.data;
}

const postQuery = async <T, U>(endpoint: string, data:U, config?: AxiosRequestConfig): Promise<T> => {
	const response = await axiosInstance.post<T>(endpoint, data, config);
	return response.data;
}

export { getQuery, postQuery }
