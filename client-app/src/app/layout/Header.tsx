import { AppBar, Toolbar, Typography } from "@mui/material"

function Header() {
    return (
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6">
            mega store
          </Typography>
        </Toolbar>
      </AppBar>      
    )
}

export { Header }