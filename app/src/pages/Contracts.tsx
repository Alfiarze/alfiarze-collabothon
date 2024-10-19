import AddContractPhoto from "../components/widgets/AddContractPhoto"
import ContractsWidget from "../components/widgets/ContractsWidget"
import ShowQRCode from "../components/widgets/ShowQRCode"

const Contracts = () => {

    return (
      <div>
        <h1>Contracts</h1>
        <AddContractPhoto/>
        <ContractsWidget/>
        <ShowQRCode/>
      </div>
    )
  }
  
  export default Contracts
  