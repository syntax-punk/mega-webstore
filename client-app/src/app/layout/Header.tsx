import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { accountLinks, navLinks } from "../tools/links";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
interface Props {
  darkMode: boolean;
  handleThemeChange: VoidFunction;
}

function Header({ darkMode, handleThemeChange }: Props) {
    return (
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component={NavLink} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
            mega store
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
          <List sx={{ display: 'flex' }}>
            { navLinks.map(({ title, path }) => (
              <ListItem 
                key={path} 
                component={NavLink} 
                to={path} 
                sx={{ color: 'inherit', typography: 'h6' }}>
                  {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

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
                sx={{ color: 'inherit', typography: 'h6' }}>
                  {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>      
    )
}

export { Header }