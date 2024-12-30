import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Edit, Display, Home, Login, Playground, Register } from "../screens";

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/display/:id" element={<Display />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
