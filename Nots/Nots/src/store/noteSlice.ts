import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
  id: number;
  title: string;
  content: string;
  category: 'work' | 'personal' | 'shopping';
  createdAt: string;
}

interface NotesState {
  notes: Note[];
  activeCategory: 'all' | 'work' | 'personal' | 'shopping';
}

const initialState: NotesState = {
  notes: [],
  activeCategory: 'all',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    setCategory: (state, action: PayloadAction<'all' | 'work' | 'personal' | 'shopping'>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, setCategory } = notesSlice.actions;
export default notesSlice.reducer;
