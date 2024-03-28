import { useCallback, useEffect, useState } from "react"
import { Header } from "./Header"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingComponent } from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { HomePage } from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async function initApp() {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch])

  useEffect(function onMount() {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header 
        darkMode={darkMode} 
        handleThemeChange={() => setDarkMode(!darkMode)} />
      { loading 
        ? <LoadingComponent message="Loading" />
        : location.pathname === '/' 
          ? <HomePage />
          : (
            <Container sx={{ mt: 4 }}>
              <Outlet />
            </Container>
          )
      }
    </ThemeProvider>
  )
}

export default App
