import './App.css'
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

function App() {
  return (
    <Router>
      <div>
        <nav>
          <a>Commerzbank logo</a>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/offer">Offer</Link>
            </li>
            <li>
              <Link to="/Filiptest">filip test</Link>
            </li>
            <li>
              <Link to="/Actions">Actions</Link>
            </li>
            <li>
              <Link to="/Contracts">Contracts</Link>
            </li>
            <li>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/Logging">Logging</Link>
            </li>
            <li>
              <Link to="/Exchange">Exchange</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/Schelude">Schelude</Link>
            </li>
            <li>
              <Link to="/Support">Support</Link>
            </li>
            <li>
              <Link to="/Survey">Survey</Link>
            </li>
            <li>
              <Link to="/Transfers">Transfers</Link>
            </li>
          </ul>
        </nav>




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
  )
}

export default App
