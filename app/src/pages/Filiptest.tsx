import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Survey from '../components/Survey';
import Exchange from '../components/Exchange';
import TransferForm from '../components/TransferForm';
import CardsList from '../components/widgets/CardsList';
import RecentTransfersList from '../components/widgets/RecentTransfersList';
import StockMarket from '../components/widgets/StockMarket';
import Contracts from '../components/widgets/Contracts';
import CustomerService from '../components/widgets/CustomerService';
import ContractsEnding from '../components/widgets/ContractsEnding';
const Filiptest = () => {
  return (
    <Router>
      <div>
        <h1>Filiptest123</h1>
        <Exchange/>
        <CardsList/>
        <RecentTransfersList/>
        <Contracts/>
        <CustomerService/>
        <ContractsEnding/>
      </div>
    </Router>
  );
};

export default Filiptest;



