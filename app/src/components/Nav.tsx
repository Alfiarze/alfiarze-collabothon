import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import logo from '../assets/images/logo.png';
import { useUser } from "../context/UserContext";


const Nav = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    const { logout } = useUser();
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      logout();
    };
  
    const menuItems = [
      { to: '/offer', label: 'Offer' },
      { to: '/Actions', label: 'Actions' },
      { to: '/Contracts', label: 'Contracts' },
      { to: '/Support', label: 'Support' },
      { to: '/Transfers', label: 'Transfers' },
    ];
  return (
    <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
                <img src={logo} alt="Commerzbank logo" style={{ maxWidth: '100%', height: 'auto', maxHeight: '40px', width: 'auto', marginRight: '10px' }}  />
            </Link>
            </Typography>
            {menuItems.slice(0, 5).map((item) => (
              <Button key={item.to} color="inherit" component={Link} to={item.to}>
                {item.label}
              </Button>
            ))}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.slice(5).map((item) => (
                <MenuItem key={item.to} onClick={handleMenuClose} component={Link} to={item.to}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
  );
};

export default Nav;
