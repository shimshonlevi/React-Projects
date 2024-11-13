import React, { useState } from 'react';
import { addNote, Category, INote } from '../../store/features/notesSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const CreateNote: React.FC = () => {

    const [title, setTitle] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [category, setCategory] = useState<Category | null>(null);

    const nev = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    const createNote = () => {
        let newNote: INote = {
            title: title!,
            content: content!,
            category: category!,
            createdAt: new Date().toString()
        };
        dispatch(addNote({note: newNote}));
        nev("/notes");
    }

  return (
    <div className='save-note'>
        <input type="text" onChange={(e: any) => setTitle(e.target.value)}/>
        <input type="text" onChange={(e: any) => setContent(e.target.value)}/>
        <select value={category!} onChange={(e: any) => setCategory(e.target.value)}>
            <option value={Category.PERSONAL}>{Category.PERSONAL}</option>
            <option value={Category.SHOPPING}>{Category.SHOPPING}</option>
            <option value={Category.WORK}>{Category.WORK}</option>
        </select>
        <button onClick={createNote}>Add Note</button>
    </div>
  )
}

export default CreateNote;