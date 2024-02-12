import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore"

function RequireAuth() {
  const { user } = useAppSelector(state => state.accountSlice);
  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return <Outlet />
}

export { RequireAuth }