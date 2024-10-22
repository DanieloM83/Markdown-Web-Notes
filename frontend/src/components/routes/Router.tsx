import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Register } from "../screens";

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
