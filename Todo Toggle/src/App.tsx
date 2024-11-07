import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Counter from './components/counter/Counter';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/CompRouter/Home';
import About from './components/CompRouter/About';
import Contact from './components/CompRouter/Contact';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>Todo App</h1>
          <AddTodo />
          <TodoList />
          <Counter />
          <nav>
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
