import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Country from "../Pages/Country/Country";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name" element={<Country />} />
        <Route path="/*" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
