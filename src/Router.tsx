import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Coin from "./routes/CoinTracker/Coin";
import Coins from "./routes/CoinTracker/Coins";
import ToDoList from "./routes/ToDoList/ToDoList";

function Router({ isLight }: { isLight: boolean }) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <BrowserRouter> */}
      <Navigation />
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path=":coinId/*" element={<Coin isLight={isLight} />} />
        <Route path="/todos" element={<ToDoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
