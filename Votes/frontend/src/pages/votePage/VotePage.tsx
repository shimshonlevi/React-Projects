import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logout } from '../../store/features/user/userSlice';
import { useNavigate } from 'react-router';
import { fetchCandidates, ICandidate } from '../../store/features/candidante/candidanteSlice';
import Spinner from '../../components/spiner/Spiner';
import CandidateCard from '../../components/candidateCard/CandidateCard';
import './votePage.css';

const VotePage: React.FC = () => {

    const { user } = useSelector((state: RootState) => state.user);

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("myUserToken");
        navigate("/login");
    }

    const renderCandidates = () => {
        if (candidates.length === 0) return;
        return candidates.map((c: ICandidate) => {
            return <CandidateCard  candidate={c} />
        });
    }

    const { candidates, isLoading } = useSelector((state: RootState) => state.candidates);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCandidates());
    }, [dispatch]);

    return (
        <div className='vote-page'>
            <div className='vote-page-navbar'>{user.isAdmin ? <Navbar /> : <button onClick={handleLogout}>Logout</button>}</div>
            {
                isLoading ? 
                <Spinner /> : 
                <div className='candidates-container'>
                    <div className='all-candidates'>
                        {renderCandidates()}
                    </div>
                </div>
            }
        </div>
    )
}

export default VotePage;
