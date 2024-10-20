import CardsList from "../components/widgets/CardsList";
import Contracts from "../components/widgets/ContractsWidget";
import ContractsEnding from "../components/widgets/ContractsEnding";
import Credit from "../components/widgets/Credit";
import CustomerService from "../components/widgets/CustomerService";
import LoyaltyPrograms from "../components/widgets/LoyaltyPrograms";
import OtherAccounts from "../components/widgets/OtherAccounts";
import RecentTransfersList from "../components/widgets/RecentTransfersList";
// import StockMarket from "../components/widgets/StockMarket";
import UpcomingPayment from "../components/widgets/UpcomingPayment";
import VisitReservation from "../components/widgets/VisitReservation";

const Widgets = () => {
    return (
        <div>
            <h1>Widgets</h1>
            <CardsList/>
            <RecentTransfersList/>
            {/* <StockMarket/> */}
            <Contracts/>
            <CustomerService/>
            <ContractsEnding/>
            <OtherAccounts/>
            <LoyaltyPrograms/>
            <UpcomingPayment/>
            <VisitReservation/>
            <Credit/>
        </div>
    )
}

export default Widgets;