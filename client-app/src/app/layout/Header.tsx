import { AppBar, Toolbar, Typography } from "@mui/material"

function Header() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            mega store
          </Typography>
        </Toolbar>
      </AppBar>      
    )
}

export { Header }