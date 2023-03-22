import { Outlet, Route, Routes } from "react-router-dom";
import "./App.scss";
import Auth from "./routes/auth/auth";

import Home from "./routes/home/home";
import Navigation from "./routes/navigation/navigation";
import Shop from "./routes/Shop/shop";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default App;