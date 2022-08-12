import { HashRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router({ isLight }: { isLight: boolean }) {
  return (
    <HashRouter basename={`${process.env.PUBLIC_URL}`}>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />} />
        <Route
          path={`${process.env.PUBLIC_URL}/:coinId/*`}
          element={<Coin isLight={isLight} />}
        />
      </Routes>
    </HashRouter>
  );
}

export default Router;
