import { useState, useEffect } from 'react';

function useForm<T>(initialState: T, editData?: T) {
    const [state, setState] = useState<T>(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (editData) {
            setState(editData);
        }
    }, [editData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(validate(state));
    };

    return { state, errors, handleChange, handleSubmit };
}

export default useForm
