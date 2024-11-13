import React from 'react';
import './noteCard.css';
import { INote } from '../../store/features/notesSlice';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

interface NoteCardProps {
    note: INote;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {

    const nav = useNavigate();

  return (
    <div className='note-card'>
        <h1>Category: {note.category}</h1>
        <div className='note-card-info'>
            <h2>Title: {note.title}</h2>
            <h3>Content: {note.content}</h3>
            <p>Created At: {note.createdAt}</p>
        </div>
        <Link to={`/notes/${note.id}`} ><button onClick={() => nav(`/notes/${note.id!}`)}>Edit Note</button></Link>
    </div>
  )
}

export default NoteCard;