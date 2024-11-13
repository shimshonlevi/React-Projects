import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import NoteGrid from '../../components/noteGrid/NoteGrid';
import { Category, INote, setActiveCategory } from '../../store/features/notesSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';

interface MainPageProps {
    notes: INote[];
}

const MainPage: React.FC<MainPageProps> = ({ notes }) => {

    const nev = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    const showAmountOfNotesByCategory = (): string => {
        let resultSTR = "";
        Object.values(Category).map((c: Category) => {
            let count = 0;
            notes.forEach((n: INote) => {
                if(n.category == c) count++;
            });
            resultSTR += `Category ${c}: notes ${count}; `;
        });
        return resultSTR; 
    }

  return (
    <div className='main-page'>
        <button onClick={() => nev("/notes/new")}>Create New Note</button>
        <label>Sort By Category</label>
        <select name="category" onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch(setActiveCategory({category: e.target.value}))}>
            <option value="all">all</option>
            {Object.values(Category).map((c: Category, ind: number) => {
                return <option value={c} key={ind}>{c}</option>
            }) }
        </select>
        <p>{showAmountOfNotesByCategory()}</p>
        <NoteGrid notes={notes}/>
    </div>
  )
}

export default MainPage;