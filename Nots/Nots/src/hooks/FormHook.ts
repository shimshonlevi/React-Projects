import { useState, useEffect } from 'react';

// הגדרת ה-hook useForm
function useForm<T>(
    initialState: T, 
    validate: (values: T) => { [key: string]: string }, 
    editData?: T
) {
    const [state, setState] = useState<T>(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (editData) {
            setState(editData);
        }
    }, [editData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(validate(state));
    };

    return { state, errors, handleChange, handleSubmit };
}

// הגדרת המשתנה initialState
const initialState = {
    title: '',
    content: '',
    category: ''
};

// קריאה ל-hook עם פונקציית ולידציה מותאמת אישית
export default useForm;
