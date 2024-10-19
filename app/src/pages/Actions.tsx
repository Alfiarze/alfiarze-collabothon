import Roulette from "../components/widgets/Roulette"
import BanksMap from "../components/widgets/BanksMap"
import FullCalendar from "../components/widgets/FullCalendar"
import StockExchange from "../components/widgets/StockExchange"

const Actions = () => {
  return (
    <div>
      <h1>Actions</h1>
      <StockExchange />
      <Roulette />
      <BanksMap />
      <FullCalendar />
    </div>
  )
}

export default Actions
