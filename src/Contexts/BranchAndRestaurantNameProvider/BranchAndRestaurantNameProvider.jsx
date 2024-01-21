import React, { createContext, useState } from 'react';
import useProfile from '../../Hooks/useProfile';

export const BranchAndRestaurantNameContext = createContext({});
const BranchAndRestaurantNameProvider = ({children}) => {

    const ParsingData = () => {
        try {
            return JSON.parse(localStorage.getItem('_foodie_rms_bd_rd'))
        } catch (error) {
            localStorage.setItem('_foodie_rms_bd_rd','');
            return null;
        }
    }

    const [selectedData,setSelectedData] = useState(localStorage.getItem('_foodie_rms_bd_rd') ? ParsingData() : null);
  
    const { permitted } = useProfile();
  
    const matchingPermission = permitted.find(permission => permission.branchID === selectedData?.branchID && permission.res_id === selectedData?.res_id);
  
  
    const value =  {
      res_id : selectedData?.res_id,
      branchID : selectedData?.branchID,
      res_img: matchingPermission?.res_img,
      res_name: matchingPermission?.res_name,
      branch_name : matchingPermission?.branch_name,
      role : matchingPermission?.role
    }

    return (
        <BranchAndRestaurantNameContext.Provider value={value}>
            {children}
        </BranchAndRestaurantNameContext.Provider>
    );
};

export default BranchAndRestaurantNameProvider;