import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router';
import DefencePage from '../../components/defencePage/DefencePage';
import AttackPage from '../../components/attackPage/AttackPage';

const PrivatePage: React.FC = () => {
    const navigate = useNavigate();
    const { token, user } = useSelector((state: RootState) => state.user);


    const isTokenValid = () => {
        const storedToken = localStorage.getItem("userToken");
        return storedToken && token;
    }


    const redirectIfInvalid = () => {
        if (!isTokenValid()) {
            console.log("Token not found or invalid");
            navigate("/login");
        }
    };

    useEffect(() => {
        redirectIfInvalid();
    }, [token]); 

    return (
        <div>
            {user?.location ? <DefencePage /> : <AttackPage />}
        </div>
    );
};

export default PrivatePage;
