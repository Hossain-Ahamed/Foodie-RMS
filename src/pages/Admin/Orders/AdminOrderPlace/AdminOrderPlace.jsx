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
import Admin_PlaceOrder_Search from './Admin_PlaceOrder_Search_User';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SwalErrorShow } from '../../../../assets/scripts/Utility';
import { Button } from '@nextui-org/react';
export const CustomPlaceOrderContext = createContext();
const AdminOrderPlace = () => {

    const [SelectedUser, setSelectedUser] = useState({ _id: "null", name: 'Anonymous', phone: '000-000-000' })

    const [isSelected, setIsSelected] = useState(null); //category selection

    const [dishesUnderCategory, setdishesUnderCategory] = useState([]); //disehes under selected category

    const [selectedItems, setSelectedItems] = useState([]);

    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('')
    const { branchID, res_id } = useRestauarantAndBranch();

    const reqURLData = {};



    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['food-list', searchQuery, location, reqURLData.reqURL],
        queryFn: async () => {
            const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/dishes-for-custom-order-for-admin`);
            // console.log(res.data)
            return res.data
        }
    })


    //set category initally
    useEffect(() => {
        if (data && Array.isArray(data)) {
            setIsSelected(data[0]?.category?.title)
        }
    }, [data])

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const dishes = data.find(i => i?.category?.title === isSelected)?.dishes
            setdishesUnderCategory(dishes)
        }
    }, [data, isSelected])

    const navigate = useNavigate()
    const addItems = (data) => {
        // Assign a serial number to the new item
        const newItem = { ...data, serial: Date.now().toLocaleString() };

        // Add the new item and sort the selectedItems array by serial number
        setSelectedItems(prevItems => [...prevItems, newItem].sort((a, b) => a.serial - b.serial));
    }

    const handlePlaceOrder = () => {
        if (selectedItems.length <= 0) {
            toast.error("Select Items Before Order");
            return;
        }
        const data = {
            userData : SelectedUser,
            dish : selectedItems
        }
        axiosSecure.post(`/restaurant/${res_id}/branch/${branchID}/dishes-for-custom-order-for-admin`, data)
            .then(res => {
                toast.success("Order Placed");
                navigate('/ongoing-orders')
            })
            .catch((e) => {
                console.log(data)
                SwalErrorShow(e);
            })
    }



    const value = {
        data,
        selectedItems,
        setSelectedItems,
        addItems,
        isSelected,
        setIsSelected,
        dishesUnderCategory, setdishesUnderCategory,
        SelectedUser, setSelectedUser
    }

    if (isLoading) {
        return <LoadingPage />
    }

    if (error) {
        return <ErrorPage />
    }
    return (
        <CustomPlaceOrderContext.Provider value={value}>
            <SectionTitle h1="Place an Order" />
            <SetTitle title="Place order" />
            <div className=' w-fit grid grid-cols-8 gap-4 mt-3'>

                <div className='col-span-2'>

                    <Order_category_container categories={data} />
                </div>
                <div className='col-span-3'><Order_dish_container /></div>
                <div className='col-span-3'>
                    <Admin_PlaceOrder_Search />
                    <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4 my-1">
                        <div className="flex items-center gap-2 text-red-800">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <div className='w-full justify-between items-center flex'>

                                <strong className="block font-medium">Need to Pay :  {selectedItems.reduce((sum, item) => sum + (item?.totalPrice || 0), 0)}</strong>
                                <button className='px-4 py-2 bg-success-500 shadow text-white font-medium rounded-lg' onClick={handlePlaceOrder}>
                                    Place Order
                                </button>
                            </div>
                        </div>


                    </div>

                    <Order_SelectedItems />
                </div>
            </div>

        </CustomPlaceOrderContext.Provider>
    );
};

export default AdminOrderPlace;