// src/App.tsx

import ToDoList from './ToDoList';
import { TasksProvider } from './TasksContext';

function App() {
    return (
        <TasksProvider>
            <ToDoList />
        </TasksProvider>
    );
}

export default App;
