import Table from '../components/Table';
import AddContractPhoto from '../components/widgets/AddContractPhoto';
import AddRecipe from '../components/widgets/AddRecipe';
import AddUpcomingPayment from '../components/widgets/AddUpcomingPayment';
import BlackJack from '../components/widgets/BlackJack';
import SlotMachine from '../components/widgets/SlotMachine';
import UpcomingPayment from '../components/widgets/UpcomingPayment';
import AddContract from './AddContract';
import Survey from '../components/SurveyWidget'; // Adjust the path as necessary

const MatiTest = () => {
  return (
    <>
      <h2>Mati Test</h2>
      <Table />
      <UpcomingPayment />
      <AddContract />
      <AddUpcomingPayment />
      <AddRecipe />
      <AddContractPhoto />
      <SlotMachine />
      <BlackJack />
      <Survey />  // Add the Survey component here
    </>
  );
};

export default MatiTest;
