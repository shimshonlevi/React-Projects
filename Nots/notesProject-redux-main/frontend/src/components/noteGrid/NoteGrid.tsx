import React from 'react';
import './noteGrid.css';
import { INote } from '../../store/features/notesSlice';
import NoteCard from '../noteCard/NoteCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface NoteGridProps {
    notes: INote[];
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes }) => {

    const activeCategory = useSelector((state: RootState) => state.notes.activeCategory);

    const renderNotes = () => {
        if(notes.length == 0) return;
        if(activeCategory === "all"){
            return notes.map((note: INote, ind: number) => {
                return <NoteCard note={note} key={ind}/>
            });
        }
        else {
            let notesByCategory = notes.filter((n: INote) => n.category == activeCategory);
            return notesByCategory.map((note: INote, ind: number) => {
                return <NoteCard note={note} key={ind}/>
            });
        }
    }

  return (
    <div className='note-grid'>
        {renderNotes()}
    </div>
  )
}

export default NoteGrid