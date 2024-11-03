// src/ToDoList.tsx
import React, { useState } from 'react';
import { useTasks } from './TasksContext';

function ToDoList() {
    const { tasks, addTask, deleteTask, toggleTaskCompletion, moveTaskUp, moveTaskDown } = useTasks();
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    function handleAddTask() {
        if (newTask.trim() !== "") {
            addTask(newTask);
            setNewTask("");
        }
    }

    return (
        <div className='ToDoList'>
            <h1>To Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className='add-button' onClick={handleAddTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? 'completed' : ''}>
                        <span className='text' onClick={() => toggleTaskCompletion(index)}>
                            {task.name}
                        </span>
                        <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                        <button className='move-button' onClick={() => moveTaskUp(index)}>☝️</button>
                        <button className='move-button' onClick={() => moveTaskDown(index)}>👇</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
