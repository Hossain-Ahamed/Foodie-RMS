import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SectionTitle from '../../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../../Shared/SetTtitle/SetTitle';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../../Hooks/useRestauarantAndBranch';
import PurchaseRow from './PurchaseRow';
import LoadingPage from '../../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../../Shared/ErrorPage/ErrorPage';

const PurchaseHistory = () => {
    const { branchID, res_id } = useRestauarantAndBranch();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: data = [], isLoading, error } = useQuery({
        queryKey: ['purchase', branchID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/all-purchase/${branchID}`);  // token : res_id  branchID , role 

            /**
             * if role === super-admin 
             *       res_id  *  => ?branch="branch_ID "
             * else 
             *   
             */
            return res.data
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
            <SetTitle title="Purchase History" />
                <div className='w-full '>
                    <SectionTitle h1="Purchase History" />
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
                                        Expense Type
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Bill Date
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Paid Date
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Pay To
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Expense Amount
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Payment Amount
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Due
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
                            <tbody>{ data && Array.isArray(data) && data.map((purchase, _idx) => <PurchaseRow key={_idx} purchase={purchase} branchID={branchID} res_id={res_id} refetch={refetch} />)}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistory;