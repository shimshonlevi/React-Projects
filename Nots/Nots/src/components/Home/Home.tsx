import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';

const Home: React.FC = () => {
  const notes = [
    { id: 1, title: 'הערה 1', content: 'תוכן ההערה 1' },
    { id: 2, title: 'הערה 2', content: 'תוכן ההערה 2' },
  ];

  const auth = useSelector((state: RootState) => state.auth);
  auth

  return (
    <div>
      <h1>דף הבית</h1>
      <Link to="/new/notes">יצירת פתק חדש</Link>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <Link to={`/edit/${note.id}`}>ערוך פתק</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
