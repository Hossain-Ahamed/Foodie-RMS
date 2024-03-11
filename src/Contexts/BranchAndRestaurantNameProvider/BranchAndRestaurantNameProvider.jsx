import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import MyRestaurants from '../../pages/Admin/MyRestaurant/MyRestaurant';

export const BranchAndRestaurantNameContext = createContext({});

const BranchAndRestaurantNameProvider = ({ children }) => {
    const [selectedData, setSelectedData] = useState(() => {
        const cookieData = Cookies.get('_foodie_rms_bd_rd');
        return cookieData ? JSON.parse(cookieData) : null;
    });

    const setBranchAndRestaurantName = (data) => {
        Cookies.set('_foodie_rms_bd_rd', JSON.stringify(data), { expires: 7, path: '/' });
        setSelectedData(data);
    };

    useEffect(() => {
        console.log('changed')
    }, [selectedData]);

    const value = {
        res_id: selectedData?.res_id,
        branchID: selectedData?.branchID,
        res_img: selectedData?.res_img,
        res_name: selectedData?.res_name,
        branch_name: selectedData?.branch_name,
        role: selectedData?.role,
        setBranchAndRestaurantName
    };

    

    if (selectedData) {
        return (
            <BranchAndRestaurantNameContext.Provider value={value}>
                {children}
            </BranchAndRestaurantNameContext.Provider>
        );
    }

    return (
        <BranchAndRestaurantNameContext.Provider value={value}>
           <MyRestaurants/>
        </BranchAndRestaurantNameContext.Provider>
    );
};

export default BranchAndRestaurantNameProvider;
