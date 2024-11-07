// EditNote.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/FormHook';

const EditNote: React.FC = () => {
  const { id } = useParams();  // שליפת ה-ID של הפתק
  const navigate = useNavigate();

  // נניח ששלפנו נתונים מ-Redux או API על פי ה-ID
  const initialState = {
    title: 'Existing Title',  // נתונים לדוגמה
    content: 'Existing content for note',
    category: 'work' as 'work' | 'personal' | 'shopping',
  };

  const { state, errors, handleChange, handleSubmit } = useForm(initialState);

  const submitForm = (e: React.FormEvent) => {
    handleSubmit(e);
    // כאן נוכל לשדר את הנתונים המעודכנים ל-Redux או API
    navigate('/home');
  };

  return (
    <div>
      <h1>Edit Note</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={state.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
          {errors.title && <span>{errors.title}</span>}
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            value={state.content}
            onChange={handleChange}
            placeholder="Enter content"
          />
          {errors.content && <span>{errors.content}</span>}
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select name="category" value={state.category} onChange={handleChange}>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>

        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;
