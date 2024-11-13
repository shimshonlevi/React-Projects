import React from "react";
import useForm from "../../hooks/FormHook.ts";
import { useNavigate } from "react-router-dom";

const NewNote: React.FC = () => {
  const navigate = useNavigate();

  // פונקציית הולידציה מותאמת אישית
  const validate = (values: { title: string; content: string; category: string }) => {
    const errors: { [key: string]: string } = {};
    if (!values.title) errors.title = 'כותרת נדרשת';
    if (!values.content) errors.content = 'תוכן נדרש';
    if (!values.category) errors.category = 'קטגוריה נדרשת';
    return errors;
  };

  // קריאה ל-useForm עם initialState ו-validate
  const { state, errors, handleChange, handleSubmit } = useForm(
    {
      title: '',
      content: '',
      category: 'personal',
    },
    validate
  );

  return (
    <div>
      <h1>New Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={state.title}
            onChange={handleChange}
          />
          {errors.title && <span>{errors.title}</span>}
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            value={state.content}
            onChange={handleChange}
          />
          {errors.content && <span>{errors.content}</span>}
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={state.category}
            onChange={handleChange}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
          </select>
          {errors.category && <span>{errors.category}</span>}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NewNote;
