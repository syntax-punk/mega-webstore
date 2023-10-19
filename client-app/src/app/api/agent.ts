import axios, { AxiosResponse } from "axios";
import { errorInterceptor } from "./interceptors";

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  response => {  return response; }, 
  errorInterceptor
)

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
} as const;

const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`),
} as const;

const TestErrors = {
  get400: () => requests.get('buggy/bad-request'),
  get401: () => requests.get('buggy/unauthorized'),
  get404: () => requests.get('buggy/not-found'),
  get500: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
  Catalog,
  TestErrors
}

export { agent }