import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Actions from './pages/Actions';
import Contracts from './pages/Contracts';
import Dashboard from './pages/Dashboard';
import Exchange from './components/Exchange';
import Filiptest from './pages/Filiptest';
import Home from './pages/Home';
import Logging from './pages/Logging';
import Login from './pages/Login';
import Offer from './pages/Offer';
import Register from './pages/Register';
import Schelude from './pages/Schelude';
import Support from './pages/Support';
import Survey from './components/Survey';
import Transfers from './pages/Transfers';
import { AppBar, Button, IconButton, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
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
    { to: '/Login', label: 'Login' },
    { to: '/Register', label: 'Register' },
    { to: '/Schelude', label: 'Schedule' },
    { to: '/Support', label: 'Support' },
    { to: '/Survey', label: 'Survey' },
    { to: '/Transfers', label: 'Transfers' },
  ];

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Commerzbank
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
              <MenuIcon />
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

        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/actions" component={Actions} />
            <Route path="/contracts" component={Contracts} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/exchange" component={Exchange} />
            <Route path="/filiptest" component={Filiptest} />
            <Route path="/logging" component={Logging} />
            <Route path="/login" component={Login} />
            <Route path="/offer" component={Offer} />
            <Route path="/register" component={Register} />
            <Route path="/schelude" component={Schelude} />
            <Route path="/support" component={Support} />
            <Route path="/Survey" component={Survey} />
            <Route path="/transfers" component={Transfers} />
            <Route path="/" component={Home} />
          </Switch>
        </div>

        <footer>
          <p>© 2024 My Website. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
