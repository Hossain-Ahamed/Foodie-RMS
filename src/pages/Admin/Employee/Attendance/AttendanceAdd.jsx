import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import AttendanceAdd_Row from './AttendanceAdd_Row';

const AttendanceAdd = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('')
    const { branchID, res_id } = useRestauarantAndBranch();

    const location = useLocation();

    const reqURLData = {};


    const { isLoading, error, data: data = [], refetch } = useQuery({
        queryKey: ['employee-list'],
        cacheTime: 0,
        queryFn: async () => {
            const res = await axiosSecure(`/restaurant/${res_id}/branch/${branchID}/all-employee-list`);
            // console.log(res.data)
            return res.data
        }
    })


    if (isLoading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }


    return (
        <section className='max-w-[1600px] mx-auto mt-5'>
            <SetTitle title="Attendance" />

            <div className='flex  gap-3 '>
                <div className='w-full '>
                    <SectionTitle h1="Attendance" />
                </div>


            </div>

            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        {
                            isLoading ? <LoadingPage />
                                :
                                <>
                                    <table className='min-w-full leading-normal'>
                                        <thead>
                                            <tr>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                                >
                                                    Employee
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                                >Branch</th>

                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
                                                >
                                                    mobile
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                                >
                                                    Role
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                                >
                                                    Attendance
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{data && Array.isArray(data) && data.map((employee, _idx) =>
                                            <AttendanceAdd_Row
                                                key={_idx}
                                                employee={employee}
                                                axiosSecure={axiosSecure}
                                                refetch={refetch}
                                            />)}</tbody>
                                    </table>
                                </>
                        }

                    </div>
                </div>

            </div>
        </section>
    );
};

export default AttendanceAdd;