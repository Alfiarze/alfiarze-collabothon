import ContractsWidget from "../components/widgets/ContractsWidget"
import ShowQRCode from "../components/widgets/ShowQRCode"

const Contracts = () => {
    return (
      <div>
        <h1>Contracts</h1>
        <ContractsWidget/>
        <ShowQRCode qrCodeUrl="https://www.google.com"/>
      </div>
    )
  }
  
  export default Contracts
  