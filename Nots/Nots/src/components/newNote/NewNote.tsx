import React from "react";
import useForm from "../../hooks/FormHook.ts";
import { useNavigate } from "react-router-dom";

const NewNote: React.FC = () => {
  const navigate = useNavigate();
  const { state, handleChange, handleSubmit } = useForm({
    title: '',
    content: '',
    category: 'personal',
  });

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
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            value={state.content}
            onChange={handleChange}
          />
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
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};