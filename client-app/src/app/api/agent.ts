import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

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
  get400: () => requests.get('buddy/bad-request'),
  get401: () => requests.get('buddy/unauthorized'),
  get404: () => requests.get('buddy/not-found'),
  get500: () => requests.get('buddy/server-error'),
  getValidationError: () => requests.get('buddy/validation-error'),
}

const agent = {
  Catalog,
  TestErrors
}

export { agent }