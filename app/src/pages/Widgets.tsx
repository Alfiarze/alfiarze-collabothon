import CardsList from "../components/widgets/CardsList";
import Contracts from "../components/widgets/Contracts";
import ContractsEnding from "../components/widgets/ContractsEnding";
import CustomerService from "../components/widgets/CustomerService";
import RecentTransfersList from "../components/widgets/RecentTransfersList";
import StockMarket from "../components/widgets/StockMarket";

const Widgets = () => {
    return (
        <div>
            <h1>Widgets</h1>
            <CardsList/>
            <RecentTransfersList/>
            <StockMarket/>
            <Contracts/>
            <CustomerService/>
            <ContractsEnding/>
        </div>
    )
}

export default Widgets;