import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./Routes/Coin";
import Coins from "./Routes/Coins";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
