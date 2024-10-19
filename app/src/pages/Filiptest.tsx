import { BrowserRouter as Router } from 'react-router-dom';
import Exchange from '../components/Exchange';
import CardsList from '../components/widgets/CardsList';
import RecentTransfersList from '../components/widgets/RecentTransfersList';
import Contracts from '../components/widgets/Contracts';
import CustomerService from '../components/widgets/CustomerService';
import ContractsEnding from '../components/widgets/ContractsEnding';
import OtherAccounts from '../components/widgets/OtherAccounts';
import Credit from '../components/widgets/Credit';
import LoyaltyPrograms from '../components/widgets/LoyaltyPrograms';
import VisitReservation from '../components/widgets/VisitReservation';
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
        <OtherAccounts/>
        <Credit/>
        <LoyaltyPrograms/>
        <VisitReservation/>
      </div>
    </Router>
  );
};

export default Filiptest;



