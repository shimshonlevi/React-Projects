import React from 'react';
import { DeploymentProvider } from './context/DeploymentContext';
import UnitStatus from './components/UnitStatus';
import MissionCompleted from './components/MissionCompleted';
// רמז: יבאו את `UnitList` ו-`MissionCompleted` מהרכיבים

const App: React.FC = () => {
    return (
        <DeploymentProvider>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>מעקב פריסת יחידות צה"ל</h1>
                <UnitStatus/>
                <MissionCompleted/>
                {/* רמז: הוסיפו כאן את רכיב `UnitList` ואת `MissionCompleted` */}
            </div>
        </DeploymentProvider>
    );
};

export default App;