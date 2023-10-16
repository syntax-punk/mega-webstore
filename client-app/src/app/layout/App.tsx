import { useState } from "react"
import { Header } from "./Header"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet } from "react-router-dom";

function App() {
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
