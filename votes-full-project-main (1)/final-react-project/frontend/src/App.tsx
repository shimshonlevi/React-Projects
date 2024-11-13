import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/login/Login";
import Signup from "./pages/register/Signup";
import PrivatePage from "./pages/privatePage/PrivatePage";
import VotePage from "./pages/votePage/VotePage";
import AdminPage from "./pages/adminPage/AdminPage";
import StatisticPage from "./pages/statisticPage/StatisticPage";

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path="/" action element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/vote" element={<PrivatePage><VotePage/></PrivatePage>}/>
        <Route path="/statistic" element={<PrivatePage><AdminPage><StatisticPage/></AdminPage></PrivatePage>}/>
      </Routes>
    </div>
  )
}

export default App;
