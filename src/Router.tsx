import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router({ isLight }: { isLight: boolean }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />} />
        <Route path=":coinId/*" element={<Coin isLight={isLight} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;