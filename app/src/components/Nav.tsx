import { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png';
import { useUser } from "../context/UserContext";

const Nav = () => {
    const { logout } = useUser();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = () => {
      logout();
    };
  
    const menuItems = [
      { to: '/offer', label: 'Offer' },
      { to: '/Actions', label: 'Exchange' },
      { to: '/Contracts', label: 'Contracts' },
      { to: '/Support', label: 'Support' },
      { to: '/Transfers', label: 'Transfers' },
      { to: '/Receipt', label: 'Receipt' },
    ];

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
        return;
      }
      setDrawerOpen(open);
    };

    const drawerContent = (
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.to} component={Link} to={item.to} onClick={toggleDrawer(false)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src={logo} alt="Commerzbank logo" style={{ maxWidth: '100%', height: 'auto', maxHeight: '40px', width: 'auto', marginRight: '10px' }}  />
          </Link>
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <>
            {menuItems.map((item) => (
              <Button key={item.to} color="inherit" component={Link} to={item.to}>
                {item.label}
              </Button>
            ))} 
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
