// import './App.css'
import { Route, Routes } from "react-router"
import { useSelector } from "react-redux"
import { RootState } from "./store/store";
import CreateNote from "./pages/createNote/CreateNote";
import EditNote from "./pages/editNote/EditNote";
import Login from "./pages/login/Login";
import PrivatePage from "./pages/PrivatePage";
import MainPage from "./pages/mainPage/MainPage";

function App() {

  const notes = useSelector((state: RootState) => state.notes.notes);

  const isLoggedIn = useSelector((state: RootState) => state.auth.auth);

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/notes" element={<PrivatePage isLoggedIn={isLoggedIn}> <MainPage notes={notes}/> </PrivatePage>}/>
        <Route path="/notes/new" element={<PrivatePage isLoggedIn={isLoggedIn}> <CreateNote/> </PrivatePage>}/>
        <Route path="/notes/:id" element={<PrivatePage isLoggedIn={isLoggedIn}> <EditNote/> </PrivatePage>}/>
      </Routes>
    </div>
  )
}

export default App;