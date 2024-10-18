import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Actions from './pages/Actions';
import Contracts from './pages/Contracts';
import Filiptest from './pages/Filiptest';
import Logging from './pages/Logging';
import Login from './pages/Login';
import Offer from './pages/Offer';
import Register from './pages/Register';
import Schelude from './pages/Schelude';
import Support from './pages/Support';
import Survey from './components/Survey';
import Transfers from './pages/Transfers';
import { Typography,  Container, Box } from '@mui/material';
import MatiTest from './pages/MatiTest';
import Nav from './components/Nav';
import { useUser } from './context/UserContext';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles';

import Exchange from './pages/Exchange';
export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Gotham, Arial, sans-serif',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#002E3C',
    },
  },
});

function App() {
  const { user } = useUser();



  useEffect(() => {
    console.log('user', user);
  }, [user]);

  if(!user){
    return (
      <ThemeProvider theme={theme}>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </Router>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>

    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />

      <Container maxWidth="lg" sx={{ width: '100%', maxWidth: '1340px !important', flexGrow: 1 }}>
      <Box>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/actions" component={Actions} />
            <Route path="/contracts" component={Contracts} />
            <Route path="/exchange" component={Exchange} />
            <Route path="/filiptest" component={Filiptest} />
            <Route path="/matitest" component={MatiTest} />
            <Route path="/logging" component={Logging} />
            <Route path="/login" component={Login} />
            <Route path="/offer" component={Offer} />
            <Route path="/register" component={Register} />
            <Route path="/schelude" component={Schelude} />
            <Route path="/support" component={Support} />
            <Route path="/Survey" component={Survey} />
            <Route path="/transfers" component={Transfers} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Box>
        </Container>
        <Box component="footer" sx={{ py: 3, px: 2, backgroundColor: 'primary.main' }}>
          <Typography variant="body2" color="white" align="center">
            © {new Date().getFullYear()} Commerzbank. All rights reserved.
          </Typography>
        </Box>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
