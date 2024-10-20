import styled from 'styled-components';
import Contracts from "./widgets/ContractsWidget";
import ContractsEnding from "./widgets/ContractsEnding";
import RecentTransfersList from "./widgets/RecentTransfersList";
import UpcomingPayment from "./widgets/UpcomingPayment";
import OtherAccounts from "./widgets/OtherAccounts";
import BankBalance from "./widgets/BankBalance";
import FullCalendar from "./widgets/FullCalendar";
import BanksMap from "./widgets/BanksMap";
import LoanOffer from './widgets/Credit';

const Container = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const GridItem = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: scroll;
`;

const LayoutUser = () => {
  return (
    <Container>
      <h1>Big Company</h1>
      <Grid>
        <GridItem>        
          <LoanOffer/>
        </GridItem>
        <GridItem>
          <Contracts/>
        </GridItem>
        <GridItem>
          <ContractsEnding/>
        </GridItem>
        <GridItem>
          <UpcomingPayment/>
        </GridItem>
        <GridItem>
          <RecentTransfersList/>
        </GridItem>
        <GridItem>
          <OtherAccounts/>
        </GridItem>
        <GridItem>
          <BankBalance/>
        </GridItem>
        <GridItem>
          <FullCalendar/>
        </GridItem>
        <GridItem>
          <BanksMap/>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default LayoutUser;