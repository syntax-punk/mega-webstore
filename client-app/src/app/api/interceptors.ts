import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

function errorInterceptor(error: AxiosError) { 
  const { data, status } = error.response as AxiosResponse

  switch(status) {
    case 400:
      if (data.errors) {
        const modelStateErrors: string[] = Object.values(data.errors);
        throw modelStateErrors.flat();
      }

      toast.error(data.title);
      break;
    case 401:
      toast.error(data.title);
      break;
    case 500:
      router.navigate("/server-error", {
        state: { error: data }
      });
      break;
    default:
      break;
  }

  return Promise.reject(error.response);
}

export { errorInterceptor }