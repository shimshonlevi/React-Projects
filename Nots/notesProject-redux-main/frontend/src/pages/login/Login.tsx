import React from 'react';
import { useNavigate } from 'react-router';
import useForm from '../../customHooks/useForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import axios from "axios";
import { login } from '../../store/features/authSlice';

const Login: React.FC = () => {

    const nev = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    const insertTokenToLocalStorage = (token: string) => {
        localStorage.setItem("token", token);
    }

    const onSubmit = async (values: any) => {
        if(values.username.length == 0 || values.password.length == 0){
            alert("you have to enter your name and your password");
            return;
        }
        const registerResponse = await axios.post("http://localhost:3001/api/auth/register", values);
        const loginResponse = await axios.post("http://localhost:3001/api/auth/login/token", values);
        console.log(loginResponse.data.token);
        insertTokenToLocalStorage(loginResponse.data.token);
        dispatch(login());
        console.log(values);
        nev("/notes");
    }

    const {formValues, handleChange, handleSubmit} = useForm({username: "", password: ""}, onSubmit);

  return (
    <div className='login'>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder='username' value={formValues.username} onChange={handleChange}/>
            <input type="text" name="password" placeholder='password' value={formValues.password} onChange={handleChange}/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login