import React, { createContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import MyRestaurants from '../../pages/Admin/MyRestaurant/MyRestaurant';
export const BranchAndRestaurantNameContext = createContext({});
const BranchAndRestaurantNameProvider = ({ children }) => {
 

    const ParsingData = () => {
        try {

            return JSON.parse(localStorage.getItem('_foodie_rms_bd_rd'))
        } catch (error) {
            localStorage.removeItem('_foodie_rms_bd_rd');
            return null;
        }
    }

    const [selectedData, setSelectedData] = useState(localStorage.getItem('_foodie_rms_bd_rd') ? ParsingData() : null);



    const setBranchAndRestaurantName = (data) => {

        localStorage.setItem('_foodie_rms_bd_rd', JSON.stringify(data));
        setSelectedData(data);
    }



    const value = {
        res_id: selectedData?.res_id,
        branchID: selectedData?.branchID,
        res_img: selectedData?.res_img,
        res_name: selectedData?.res_name,
        branch_name: selectedData?.branch_name,
        role: selectedData?.role,
        setBranchAndRestaurantName
    }

    console.log('object1')
    if (selectedData) {

        return (
            <BranchAndRestaurantNameContext.Provider value={value}>
                {children}
            </BranchAndRestaurantNameContext.Provider>
        );
    }

    console.log('object2')
    return (
        <BranchAndRestaurantNameContext.Provider value={value}>
           <MyRestaurants/>
        </BranchAndRestaurantNameContext.Provider>
    );
};

export default BranchAndRestaurantNameProvider;