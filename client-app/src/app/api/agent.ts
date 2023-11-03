import axios, { AxiosResponse } from "axios";
import { errorInterceptor } from "./interceptors";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async response => {  
    await sleep();
    return response;
   }, 
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

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
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
  Basket,
  TestErrors
}

export { agent }