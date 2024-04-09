import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { accountLinks, navLinks } from "../tools/links";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useAppSelector } from "../store/configureStore";
import { SignedInMenu } from "./SignedInMenu";
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

    const { basket } = useAppSelector(state => state.basketSlice);
    const { user } = useAppSelector(state => state.accountSlice);
    const itemsCount = basket?.items.reduce((current, item) => current + item.quantity || 0, 0);

    return (
      <AppBar position="static">
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
            { user &&
              <ListItem 
                  component={NavLink} 
                  to={"/inventory"} 
                  sx={navStyles}>
                    INVENTORY
              </ListItem>
            }
          </List>
          
          <Box display='flex' alignItems='center'>
            <IconButton component={Link} to="/basket" size="large" edge='start' color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={itemsCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {user ? (<SignedInMenu />) : (
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
            )}
          </Box>
        </Toolbar>
      </AppBar>      
    )
}

export { Header }