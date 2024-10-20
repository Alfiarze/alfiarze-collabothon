import styled from 'styled-components';

import CardsList from "../components/widgets/CardsList";
import Contracts from "../components/widgets/ContractsWidget";
import ContractsEnding from "../components/widgets/ContractsEnding";
import RecentTransfersList from "../components/widgets/RecentTransfersList";
import UpcomingPayment from "../components/widgets/UpcomingPayment";
import ReceiptWidget from "../components/widgets/ReceiptWidget";
import BankBalance from "../components/widgets/BankBalance";
import FullCalendar from "../components/widgets/FullCalendar";
import BanksMap from "../components/widgets/BanksMap";

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
      <h1>Individual User</h1>
      <Grid>
        <GridItem>        
          <CardsList/>
        </GridItem>
        <GridItem>
          <Contracts/>
        </GridItem>
        <GridItem>
          <ContractsEnding/>
        </GridItem>
        <GridItem>
          <RecentTransfersList/>
        </GridItem>
        <GridItem>
          <UpcomingPayment/>
        </GridItem>
        <GridItem>
          <ReceiptWidget/>
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