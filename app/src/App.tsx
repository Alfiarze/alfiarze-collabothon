import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Actions from './pages/Stocks';
import Contracts from './pages/Contracts';
import Logging from './pages/Logging';
import Login from './pages/Login';
import Offer from './pages/Offer';
import Register from './pages/Register';
import Schelude from './pages/Schelude';
import Support from './pages/Support';
import Survey from './components/SurveyWidget';
import Transfers from './pages/Transfers';
import { Typography,  Container, Box } from '@mui/material';
import MatiTest from './pages/MatiTest';
import Nav from './components/Nav';
import { useUser } from './context/UserContext';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles';

import Exchange from './pages/Exchange';
import Chat from './pages/Chat';
import AddContract from './pages/AddContract';
import TransferForm from './components/TransferForm';
import axiosPrivate from './ctx/axiosPrivate';
import Loading from './components/Loading';
export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
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
  const [showSurvey, setShowSurvey] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setShowSurvey(false);
  //   setLoading(true);
    
  //   if (localStorage.getItem('surveyCompleted') !== 'true') {
  //     setShowSurvey(true);
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //   }

  // }, []);

  if (loading) {
    return <Loading />;
  }

  if (showSurvey && user) {
    return <Survey />;
  }

  if (!user) {
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
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Nav />
          <Container maxWidth="lg" sx={{ width: '100%', maxWidth: '1340px !important', flexGrow: 1, my: 2 }}>
            <Switch>
              <Route path="/actions" component={Actions} />
              <Route path="/add-contract" component={AddContract} />
              <Route path="/transfer-form" component={TransferForm} />
              <Route path="/contracts" component={Contracts} />
              <Route path="/exchange" component={Exchange} />
              <Route path="/matitest" component={MatiTest} />
              <Route path="/logging" component={Logging} />
              <Route path="/login" component={Login} />
              <Route path="/offer" component={Offer} />
              <Route path="/register" component={Register} />
              <Route path="/schelude" component={Schelude} />
              <Route path="/support" component={Support} />
              <Route path="/Survey" component={Survey} />
              <Route path="/transfers" component={Transfers} />
              <Route path="/chat" component={Chat} />
              <Route 
                exact 
                path="/" 
                render={(props) => <Dashboard key={Date.now()} {...props} />} 
              />
              <Route component={Dashboard} />
            </Switch>
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
