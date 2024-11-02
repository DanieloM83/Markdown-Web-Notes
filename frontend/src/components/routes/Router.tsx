import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Playground, Register } from "../screens";

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
