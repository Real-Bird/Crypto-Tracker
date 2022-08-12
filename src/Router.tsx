import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router({ isLight }: { isLight: boolean }) {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />} />
        <Route
          path={`${process.env.PUBLIC_URL}/:coinId/*`}
          element={<Coin isLight={isLight} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
