import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Terorists } from '../../types/Ftype';
import './attackPage.css'; 

const AttackPage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.user);

    const [selectedDestination, setSelectedDestination] = useState<string>(Object.values(Terorists)[0]);

    const handleDestinationChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDestination(e.target.value);
    };

    return (
        <div className='attack-page'>
            <header className='title'>
                <h1>Organization: {user ? `${user.organization}` : "Terrorist"}</h1>
            </header>

            <nav className='nav'>
                <div className='nav-title'>
                    <h3>Available Ammunition</h3>
                </div>

                <div className='nav-info'>
                    <select
                        name="destination"
                        className="destination-select"
                        value={selectedDestination}
                        onChange={handleDestinationChange}
                    >
                        {Object.values(Terorists).map((destination, index) => (
                            <option key={index} value={destination}>{destination}</option>
                        ))}
                    </select>

                    <div className='weapons'>
                        <span>Hetz-3 x 3</span>
                        <span>Hetz-3 x 3</span>
                        <span>Hetz-3 x 3</span>
                    </div>

                    <button className="logout-button">Log Out</button>
                </div>
            </nav>

            <section className='rockets-section'>
                <h2>Launched Rockets</h2>
                <table className="rockets-table">
                    <thead>
                        <tr>
                            <th>Rocket Type</th>
                            <th>Time to Impact</th>
                            <th>Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Qassam</td>
                            <td>20 seconds</td>
                            <td>Launched</td>
                        </tr>
                        <tr>
                            <td>Qassam</td>
                            <td>20 seconds</td>
                            <td>Launched</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AttackPage;
