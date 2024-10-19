
import Table from '../components/Table';
import AddContractPhoto from '../components/widgets/AddContractPhoto';
import AddRecipe from '../components/widgets/AddRecipe';
import AddUpcomingPayment from '../components/widgets/AddUpcomingPayment';
import UpcomingPayment from '../components/widgets/UpcomingPayment';
import AddContract from './AddContract';

const MatiTest = () => {
  return (
    <>
    <h2>Mati Test</h2>
    <Table/>
    <UpcomingPayment/>
    <AddContract/>
    <AddUpcomingPayment/>
    <AddRecipe/>
    <AddContractPhoto/>
    
    </>
  );
};

export default MatiTest;

