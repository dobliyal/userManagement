import { useState, ChangeEvent } from 'react';

export const useForm = <T extends Record<string, any>>(initialState: T) => {
    const [values, setValues] = useState<T>(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const resetForm = () => setValues(initialState);

    return { values, handleChange, resetForm, setValues };
};
