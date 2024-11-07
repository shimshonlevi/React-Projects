import React, { createContext, useState  } from 'react';


// הגדרת סוג המידע עבור הקשר הפריסה
type DeploymentContextType = {
    units: { [key: string]: string };
    setUnitStatus: (unit: string, status: string) => void;
};

// יצירת ההקשר
const DeploymentContext = createContext<DeploymentContextType | undefined>(undefined);

const DeploymentProvider: React.FC<React.PropsWithChildren> = ({children }) => {
    // הגדרת מצב התחלתי
    const [units, setUnits] = useState({
        Golani: 'Idle',
        Paratroopers: 'Idle',
        Givati: 'Idle',
        Artillery: 'Idle', 
        Navy: 'Idle'    
    });

    // פונקציה לשינוי מצב היחידות
    const setUnitStatus = (unit: string, status: string) => {
        setUnits(prevUnits => ({ ...prevUnits, [unit]: status }));
    };

    return (
        <DeploymentContext.Provider value={{ units, setUnitStatus }}>
            {children}
        </DeploymentContext.Provider>
    );
};

export { DeploymentContext, DeploymentProvider };