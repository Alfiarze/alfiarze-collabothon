import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import logo from '../assets/images/logo.png';


const Nav = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const menuItems = [
      { to: '/', label: 'Home' },
      { to: '/offer', label: 'Offer' },
      { to: '/Filiptest', label: 'Filip test' },
      { to: '/MatiTest', label: 'Mati test' },
      { to: '/Actions', label: 'Actions' },
      { to: '/Contracts', label: 'Contracts' },
      { to: '/Dashboard', label: 'Dashboard' },
      { to: '/Logging', label: 'Logging' },
      { to: '/Exchange', label: 'Exchange' },
      { to: '/Schelude', label: 'Schedule' },
      { to: '/Support', label: 'Support' },
      { to: '/Survey', label: 'Survey' },
      { to: '/Transfers', label: 'Transfers' },
    ];
  return (
    <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <a href="https://www.commerzbank.de/">
            <img src={logo} alt="Commerzbank logo" style={{ maxWidth: '100%', height: 'auto', maxHeight: '40px', width: 'auto'}}  />
            </a>
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
          </Toolbar>
        </AppBar>
  );
};

export default Nav;
