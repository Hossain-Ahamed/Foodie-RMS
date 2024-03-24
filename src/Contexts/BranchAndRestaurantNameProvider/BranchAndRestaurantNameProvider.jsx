import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import MyRestaurants from '../../pages/Admin/MyRestaurant/MyRestaurant';
import CryptoJS from 'crypto-js';
export const BranchAndRestaurantNameContext = createContext({});

const BranchAndRestaurantNameProvider = ({ children }) => {


    const ParsingData = () => {
        try {
            return JSON.parse(CryptoJS.AES.decrypt(Cookies.get('_foodie_rms_bd_rd'), import.meta.env.VITE_ENC).toString(CryptoJS.enc.Utf8))
        } catch (error) {
            Cookies.remove('_foodie_rms_bd_rd');
            return null;
        }
    }

    
    const [selectedData, setSelectedData] = useState(Cookies.get('_foodie_rms_bd_rd') ? ParsingData() : null);

    const setBranchAndRestaurantName = (data) => {

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_ENC).toString();
        Cookies.set('_foodie_rms_bd_rd', encryptedData, {
            secure: true, // Secure flag (requires HTTPS)
        sameSite: 'Strict', // SameSite attribute ('Strict' or 'Lax')
        });
        setSelectedData(data);
    };


    const value = {
        res_id: selectedData?.res_id,
        branchID: selectedData?.branchID,
        res_img: selectedData?.res_img,
        res_name: selectedData?.res_name,
        branch_name: selectedData?.branch_name,
        role: selectedData?.role,
        setBranchAndRestaurantName
    };

    

    if (!selectedData) {
      console.log('object')
        return (
            <BranchAndRestaurantNameContext.Provider value={value}>
               <MyRestaurants/>
            </BranchAndRestaurantNameContext.Provider>
        );
       
    }
   
    return (
        <BranchAndRestaurantNameContext.Provider value={value}>
            {children}
        </BranchAndRestaurantNameContext.Provider>
    );
  
    
};

export default BranchAndRestaurantNameProvider;
