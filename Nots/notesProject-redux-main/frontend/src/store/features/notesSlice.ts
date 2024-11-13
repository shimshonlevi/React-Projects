import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Category{
    WORK = "work",
    PERSONAL = "personal",
    SHOPPING = "shopping"
}

export interface INote {
    id?: number;
    title: string;
    content: string;
    createdAt: string;
    category: Category;
}

interface NoteStateType{
    notes: INote[];
    activeCategory: Category | string;
}

const initialState : NoteStateType = {
        notes: [
            {
                id: 0,
                title: "note 1",
                content: "bla bla",
                createdAt: new Date().toString(),
                category: Category.PERSONAL
            },  
        ],
        activeCategory: "all"
};

export const notesSlice = createSlice({
    initialState,
    name: "notes",
    reducers: {
        addNote: (state, action: PayloadAction<{note: INote}>) => {
            const newID = state.notes[state.notes.length-1].id! + 1;
            state.notes.push({...action.payload.note, id: newID});
        },
        editNote: (state, action: PayloadAction<{id: number, note: INote}>) => {
            let noteIndex = state.notes.findIndex((n: INote) => n.id === action.payload.id);
            if(noteIndex > -1){
                state.notes[noteIndex] = {...action.payload.note, id: action.payload.id};
            }
        },
        setActiveCategory: (state, action: PayloadAction<{category: Category | string}>) => {
            state.activeCategory = action.payload.category;
        }
    }
});

export const {addNote, editNote, setActiveCategory} = notesSlice.actions;

export default notesSlice.reducer;