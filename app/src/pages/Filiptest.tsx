import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Survey from '../components/Survey';
import Exchange from '../components/Exchange';
import TransferForm from '../components/TransferForm';
import CardsList from '../components/widgets/CardsList';
import RecentTransfersList from '../components/widgets/RecentTransfersList';

const Filiptest = () => {
  return (
    <Router>
      <div>
        <h1>Filiptest123</h1>
        <Exchange/>
        <CardsList/>
        <RecentTransfersList/>
      </div>
    </Router>
  );
};

export default Filiptest;



