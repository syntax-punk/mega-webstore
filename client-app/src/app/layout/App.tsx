import { useEffect, useState } from "react"
import { Header } from "./Header"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../utils/misc";
import { agent } from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(function onMount() {
    const buyerId = getCookie('buyerId');
    if (!buyerId) return setLoading(false);

    agent.Basket.get()
      .then(basket => {
        setBasket(basket);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [setBasket])

  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    }
  })

  if (loading) return <LoadingComponent message="Initializing app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header 
        darkMode={darkMode} 
        handleThemeChange={() => setDarkMode(!darkMode)} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
