import React, { useState } from 'react';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import ExpenseRow from './ExpenseRow';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';

const ExpenseAndSalary = () => {
    const {branchID, res_id} = useRestauarantAndBranch();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: expenses = [], isLoading, error } = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/all-expenses/${branchID}`);  // token : res_id  branchID , role 

            /**
             * if role === super-admin 
             *       res_id  *  => ?branch="branch_ID "
             * else 
             *   
             */
            return res.data
        }
    });
    return (
        <div className='container mx-auto px-4 sm:px-8 select-none'>
            <SetTitle title="Expense & Salary" />
            <div className='flex  gap-3 '>
                <div className='w-full '>
                    <SectionTitle h1="Expense & Salary" />
                </div>
                <div>
                    <Link to={`/add-expenses`} className='flex justify-center items-center gap-2 text-white font-medium  px-4 py-2 bg-green-400 rounded-md text-nowrap '>Add Expense<IoAddOutline className='text-white' /></Link>

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
                            <tbody>{expenses.map((expense, _idx) => <ExpenseRow key={_idx} expense={expense} branchID={branchID} res_id={res_id} refetch={refetch} />)}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseAndSalary;