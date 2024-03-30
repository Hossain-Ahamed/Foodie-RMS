import React, { createContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import Order_category_container from './Order_category_container';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import Order_dish_container from './Order_dish_container';
import Order_SelectedItems from './Order_SelectedItems';
export const CustomPlaceOrderContext = createContext();
const AdminOrderPlace = () => {


    const [isSelected, setIsSelected] = useState(null); //category selection
    
    const [dishesUnderCategory,setdishesUnderCategory] = useState([]); //disehes under selected category

    const [selectedItems,setSelectedItems] = useState([]);

    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('')
    const { branchID, res_id } = useRestauarantAndBranch();

    const reqURLData = {};



    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['employee-list', searchQuery, location, reqURLData.reqURL],
        cacheTime: 0,
        queryFn: async () => {
            const res = await axiosSecure(`/restaurant/${res_id}/branch/${branchID}/dishes-for-custom-order-for-admin`);
            // console.log(res.data)
            return res.data
        }
    })


    //set category initally
    useEffect(()=>{
     if(data && Array.isArray(data)){
        setIsSelected(data[0]?.category?.title)
     }
    },[data])

    useEffect(()=>{
        if(data && Array.isArray(data)){
           const dishes = data.find(i=> i?.category?.title === isSelected)?.dishes
           setdishesUnderCategory(dishes)
         }
    },[data,isSelected])


    const addItems = (data) => {
        // Assign a serial number to the new item
        const newItem = { ...data, serial: Date.now().toLocaleString() };
    
        // Add the new item and sort the selectedItems array by serial number
        setSelectedItems(prevItems => [...prevItems, newItem].sort((a, b) => a.serial - b.serial));
    }


    
    
    const value = {
        data,
        selectedItems,
        setSelectedItems,
        addItems,
        isSelected,
        setIsSelected,
        dishesUnderCategory,setdishesUnderCategory
    }

    if (isLoading) {
        return <LoadingPage />
    }

    if (error) {
        return <ErrorPage />
    }
    return (
        <CustomPlaceOrderContext.Provider value={value}>
            <SectionTitle h1="Place an Order"/>
            <SetTitle title="Place order"/>
        <div className=' w-fit grid grid-cols-8 gap-4 mt-3'>

            <div className='col-span-2'>
                
                <Order_category_container categories={data}/>
            </div>
            <div className='col-span-3'><Order_dish_container /></div>
            <div className='col-span-3'>
                <Order_SelectedItems/>
            </div>
        </div>

        </CustomPlaceOrderContext.Provider>
    );
};

export default AdminOrderPlace;