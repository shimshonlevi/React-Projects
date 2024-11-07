import React, { useContext } from 'react';
import { DeploymentContext } from '../context/DeploymentContext';

type UnitStatusProps = {
    unitName: string;
};

const UnitStatus: React.FC<UnitStatusProps> = ({ unitName }) => {
    const deploymentContext = useContext(DeploymentContext);
    if (!deploymentContext) {
        throw new Error("UnitStatus must be used within a DeploymentProvider");
    }

    const { units } = deploymentContext;

    return <p>{unitName}: {/* רמז: הציגו את המצב הנוכחי של היחידה כאן */}</p>;
};

export default UnitStatus;