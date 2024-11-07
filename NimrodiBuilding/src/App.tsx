import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Reception from "./pages/Reception/Reception";
import Floor from "./pages/Floor/Floor";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/Layout/Layout";
import Forbidden from "./pages/Forbidden/Forbidden";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Reception />} />
          <Route path="/floor/:index" element={<Floor />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
    </Router>
  );
};

export default App;