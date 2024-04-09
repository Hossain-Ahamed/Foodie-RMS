import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import InventoryReportRow from './InventoryReportRow';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';

const InventoryReport = () => {
    const { branchID, res_id } = useRestauarantAndBranch();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: data = [], isLoading, error } = useQuery({
        queryKey: ['expenses', branchID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/restaurant/${res_id}/branch/${branchID}/inventory-report/`);  // token : res_id  branchID , role 

            /**
             * if role === super-admin 
             *       res_id  *  => ?branch="branch_ID "
             * else 
             *   
             */
            return res.data
            // return [
            //     {
            //         itemName: "Chicken",
            //         vendorName: "Chick Shop",
            //         unit: 3,
            //         unitPrice: 179
            //     },
            //     {
            //         itemName: "Tomato Sauce",
            //         vendorName: "Pran Sauce",
            //         unit: 12,
            //         unitPrice: 139
            //     },
            //     {
            //         itemName: "Bel Paper",
            //         vendorName: "Pran Sauce",
            //         unit: 0,
            //         unitPrice: 150
            //     },
            // ]
        }
    });
    if (isLoading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }
    return (
        <div className='container mx-auto px-4 sm:px-8 select-none'>
            <SetTitle title="Inventory Report" />
            <div className='flex  gap-3 '>
                <div className='w-full '>
                    <SectionTitle h1="Inventory Report" />
                </div>
                <div>
                    <Link to={`/add-inventory`} className='flex justify-center items-center gap-2 text-white font-medium  px-4 py-2 bg-green-400 rounded-md text-nowrap '>Add to Inventory<IoAddOutline className='text-white' /></Link>

                </div>

            </div>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-h_idden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Item Name
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Vendor Name
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Unit
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Unit Price
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{data && Array.isArray(data) && data.map((item, _idx) => <InventoryReportRow key={_idx} item={item} branchID={branchID} res_id={res_id} refetch={refetch} />)}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryReport;