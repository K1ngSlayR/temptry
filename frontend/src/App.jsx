import "./App.css";
import FindCreators from "./pages/FindCreators";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import FindGames from "./pages/FindGames";
import DetailsPage from "./pages/DetailsPage";
import Login from "./pages/Login";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/lol" element={<FindCreators />} />
          <Route path="/my-games" element={<FindGames />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details" element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
