import {} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Note from './components/Note/Note';
import NewNote from './components/newNote/NewNote';
import NotsList from './components/NotsList/NotsList';
import NotsItem from './components/NotsItem/NotsItem';
import EditNote from './components/EditNote/editNote';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new/notes" element={<NewNote />} />
          <Route path="/notes" element={<NotsList />} />
          <Route path="/notes/:id" element={<NotsItem />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

