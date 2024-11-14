import React from 'react';
import useForm from '../../hooks/useForm';
import { IDF, IRegister, Terorists } from '../../types/Ftype';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/slices/userSlice';
import './register.css';

const Register: React.FC = () => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit = () => {
        if (formValues.username === "" || formValues.password === "") {
            alert("Please enter your details.");
            return;
        }

        const data: IRegister = {
            username: formValues.username,
            password: formValues.password,
            organization: formValues.organization,
            location: formValues.location,
        };

        dispatch(registerUser(data));
        navigate("/login"); 
    };

    const { formValues, handleChange, handleSubmit } = useForm(
        { username: "", password: "", organization: "Hezbollah", location: "North" },
        onSubmit
    );

    return (
        <div className='register'>
            <div className='register-container'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formValues.username} 
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formValues.password} 
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Organization</label>
                        <select 
                            name="organization" 
                            value={formValues.organization} 
                            onChange={handleChange}
                        >
                            {Object.values(Terorists).map((val, ind) => (
                                <option key={ind} value={val}>{val}</option>
                            ))}
                            <option value="IDF">IDF</option>
                        </select>
                    </div>
                    <div style={{ display: formValues.organization === "IDF" ? "flex" : "none" }}>
                        <label>Location</label>
                        <select 
                            name="location" 
                            value={formValues.location} 
                            onChange={handleChange} 
                            disabled={formValues.organization !== "IDF"}
                        >
                            {Object.values(IDF).map((val, ind) => (
                                <option key={ind} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
