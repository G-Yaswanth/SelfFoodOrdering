import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../pages/Menu";
import Dashboard from "../pages/Dashboard";
import Success from "../pages/Success";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/success" element={<Success/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;