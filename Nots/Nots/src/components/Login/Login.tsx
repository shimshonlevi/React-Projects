import React from 'react';
import useForm from '../../hooks/FormHook';  // Import של ה-Hook

const Login: React.FC = () => {
  // הגדרת ה-state ההתחלתי של הטופס (כדי לדעת את המידע שנרצה לשמור)
  const initialState = {
    username: '',
    password: '',
  };

  // קריאה ל-Hook useForm עם ה-state ההתחלתי
  const { state, errors, handleChange, handleSubmit } = useForm(initialState);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">שם משתמש:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label htmlFor="password">סיסמה:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit">כניסה</button>
    </form>
  );
};

export default Login;
