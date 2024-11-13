import React, { useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Category, editNote, INote } from '../../store/features/notesSlice';
import { useNavigate, useParams } from 'react-router';

const EditNote: React.FC = () => {

    const nev = useNavigate();

    const {id} = useParams();

    const notes = useSelector((state: RootState) => state.notes.notes);

    const myNote = notes.find((n: INote) => n.id === +id!);

    const [title, setTitle] = useState<string>(myNote!.title);
    const [content, setContent] = useState<string>(myNote!.content);
    const [category, setCategory] = useState<Category>(myNote!.category);
    const [date, setDate] = useState<string>(myNote!.createdAt);

    const dispatch: AppDispatch = useDispatch();

    const updateNote = () => {
        let noteToUpdate: INote = {
            title: title!,
            content: content!,
            category: category!,
            createdAt: date
        };
        dispatch(editNote({id: myNote!.id!, note: noteToUpdate}));
        nev("/notes");
    }

  return (
    <div className='edit-note'>
        <input type="text" value={title} onChange={(e: any) => setTitle(e.target.value)}/>
        <input type="text" value={content} onChange={(e: any) => setContent(e.target.value)}/>
        <select value={category} onChange={(e: any) => setCategory(e.target.value)}>
            <option value={Category.PERSONAL}>{Category.PERSONAL}</option>
            <option value={Category.SHOPPING}>{Category.SHOPPING}</option>
            <option value={Category.WORK}>{Category.WORK}</option>
        </select>
        <input type="date" value={date} onChange={(e: any) => setDate(e.target.value)}/>
        <button onClick={updateNote}>Update</button>
    </div>
  )
}

export default EditNote