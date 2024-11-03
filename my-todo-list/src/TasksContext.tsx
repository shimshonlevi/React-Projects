// src/TasksContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Task {
    name: string;
    completed: boolean;
}

interface TasksContextType {
    tasks: Task[];
    addTask: (name: string) => void;
    deleteTask: (index: number) => void;
    toggleTaskCompletion: (index: number) => void;
    moveTaskUp: (index: number) => void;
    moveTaskDown: (index: number) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (name: string) => {
        const newTask = { name, completed: false };
        setTasks(t => [...t, newTask]);
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleTaskCompletion = (index: number) => {
        setTasks(tasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        ));
    };

    const moveTaskUp = (index: number) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    const moveTaskDown = (index: number) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTaskCompletion, moveTaskUp, moveTaskDown }}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TasksContext);
    if (!context) throw new Error("useTasks must be used within a TasksProvider");
    return context;
}
