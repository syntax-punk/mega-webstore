import axios, { AxiosResponse } from "axios";
import { errorInterceptor } from "./interceptors";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(async config => {
  const token = store.getState().accountSlice.user?.token;
  if (token) 
    config.headers.Authorization = `Bearer ${token}`;
  return config;
})

axios.interceptors.response.use(
  async response => {  
    if (import.meta.env.DEV) {
      await sleep();
    }
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
      return response;
    }
    return response;
   }, 
  errorInterceptor
)

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) => axios.post(url, data, {
    headers: {'Content-type': 'multipart/form-data'}
  }).then(responseBody),
  putForm: (url: string, data: FormData) => axios.put(url, data, {
    headers: {'Content-type': 'multipart/form-data'}
  }).then(responseBody),
} as const;

function createFormData(item: any) {
  const formData = new FormData();
  
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

const Admin = {
  createProduct: (product: any) => requests.postForm('products', createFormData(product)),
  updateProduct: (product: any) => requests.putForm('products', createFormData(product)),
  deleteProduct: (id: number) => requests.delete(`products/${id}`),
} as const;

const Catalog = {
  list: (params: URLSearchParams) => requests.get('products', params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get('products/filters'),
} as const;

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
} as const;

const Account = {
  login: (values: any) => requests.post('account/login', values), 
  register: (values: any) => requests.post('account/register', values), 
  currentUser: () => requests.get('account/currentUser'),
  fetchAddress: () => requests.get('account/savedAddress'),
} as const;

const Orders = {
  list: () => requests.get('orders'),
  fetch: (id: number) => requests.get(`orders/${id}`),
  create: (values: any) => requests.post('orders', values),
} as const;

const Payments = {
  createPaymentIntent: () => requests.post('payments', {}),
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
  Account,
  Orders,
  Admin,
  Payments,
  TestErrors
}

export { agent }