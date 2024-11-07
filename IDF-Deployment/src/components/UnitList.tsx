// import React, { useContext } from 'react';
// import { DeploymentContext } from '../context/DeploymentContext';
// import UnitStatus from './UnitStatus';
// import ChangeStatus from './ChangeStatus';
// // רמז: יבאו את `UnitStatus` ו-`ChangeStatus`

// const UnitList: React.FC = () => {
//     const deploymentContext = useContext(DeploymentContext);

//     if (!deploymentContext) {
//         throw new Error("UnitList must be used within a DeploymentProvider");
//     }

//     const { units } = deploymentContext;

//     return (
//         <div>
//         <h2>רשימת יחידות</h2>
//         <ul>
//             {Object.entries(units).map(([unit, status]) => (
//                 <li key={unit}>
//                     <UnitStatus unit={unit} status={status} />
//                     <ChangeStatus unit={unit} />
//                 </li>
//             ))}
//         </ul>
//     </div>
//     );
// };

// export default UnitList;