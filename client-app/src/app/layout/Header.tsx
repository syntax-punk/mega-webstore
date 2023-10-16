import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { accountLinks, navLinks } from "../tools/links";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
interface Props {
  darkMode: boolean;
  handleThemeChange: VoidFunction;
}

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  }
}

function Header({ darkMode, handleThemeChange }: Props) {
    return (
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box display='flex' alignItems='center'>
            <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
              mega store
            </Typography>
            <Switch checked={darkMode} onChange={handleThemeChange} />
          </Box>

          <List sx={{ display: 'flex' }}>
            { navLinks.map(({ title, path }) => (
              <ListItem 
                key={path} 
                component={NavLink} 
                to={path} 
                sx={navStyles}>
                  {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          
          <Box display='flex' alignItems='center'>
            <IconButton size="large" edge='start' color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent='4' color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <List sx={{ display: 'flex' }}>
              { accountLinks.map(({ title, path }) => (
                <ListItem 
                  key={path} 
                  component={NavLink} 
                  to={path} 
                  sx={navStyles}>
                    {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>      
    )
}

export { Header }