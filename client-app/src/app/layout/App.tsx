import { useState } from "react"
import { Catalog } from "../../features/catalog/Catalog"
import { Header } from "./Header"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"

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
        <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App
