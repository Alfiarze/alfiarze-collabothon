import AddRecipe from '../components/widgets/AddRecipe'; // Adjust the path as necessary
import ShowReceipt from '../components/widgets/ShowReceipt'; // Adjust the path as necessary
const Receipt = () => {
  return (
    <div>
      <h1>Receipt</h1>
      <AddRecipe />  // Add the AddRecipe component here
      <ShowReceipt/>
    </div>
  );
};

export default Receipt;

