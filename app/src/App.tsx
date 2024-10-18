import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { AppBar, Button, IconButton, Typography, Menu, MenuItem, Container, Box, Box } from '@mui/material';
import MatiTest from './pages/MatiTest';
import Nav from './components/Nav';
import { useUser } from './context/UserContext';

function App() {
  const { user } = useUser();

  if(!user){
    return (
      <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Login} />
              </Switch>
      </div>
      </Router>
    )
  }

  return (
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
            <Route path="/dashboard" component={Dashboard} />
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
            <Route path="/" component={Home} />
          </Switch>
        </Box>
        </Container>
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'primary.main' }}>
          <Typography variant="body2" color="white" align="center">
            © {new Date().getFullYear()} Commerzbank. All rights reserved.
          </Typography>
        </Box>
      </div>
    </Router>
  );
}

export default App;
