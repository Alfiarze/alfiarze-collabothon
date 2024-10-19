import RecentTransfersList from "../components/widgets/RecentTransfersList"
import UpcomingPayments from "../components/widgets/UpcomingPayment"

const Transfers = () => {
    return (
      <div>
        <h1>Transfers</h1>
        <RecentTransfersList />
        <UpcomingPayments />
      </div>
    )
  }
  
  export default Transfers
  