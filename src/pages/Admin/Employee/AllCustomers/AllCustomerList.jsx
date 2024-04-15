import React, { useState } from 'react';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { Link, useLocation } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import AllCustomerListRow from './AllCustomerListRow';

const AllCustomerList = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('')
    const { branchID, res_id } = useRestauarantAndBranch();

    const location = useLocation();

    const reqURLData = {};


    if (location.pathname === '/customers') {
        reqURLData.reqURL = `/admin/restaurant/${res_id}/all-customers`;
        reqURLData.h1 = "Customer List"

    } else {
        reqURLData.reqURL = `/admin/restaurant/${res_id}/all-customers`;
        reqURLData.h1 = "Customer List"
    }

    const { isLoading, error, data: data = [], refetch } = useQuery({
        queryKey: ['customers', searchQuery, location, reqURLData.reqURL],
        cacheTime: 0,
        queryFn: async () => {
            const res = await axiosSecure(reqURLData.reqURL);
            return res.data
            // return {
            //     "f_name": "Hossain ",
            //     "l_name": "Ahamed",
            //     "email": "contact.hossainahamed@gmail.com",
            //     "profilePhoto": "https://i.ibb.co/ysL5j3p/pp.png",
            //     "nid": "0000",
            //     "_id": "65f58f6bdb04fc0c1e571f91",
            //     "mobile": "01868726172",
            //     "role": "Kitchen Staff",
            //     "branchID": "6612db3a585f917afc16b14a",
            //     "branchName": "Narayanganj -1 "
            // }
        }
    })

    if (error) {
        return <ErrorPage />
    }


    return (
        <section className='max-w-[1600px] mx-auto mt-5'>
            <SetTitle title={reqURLData?.h1} />

                <div className='w-full '>
                    <SectionTitle h1={reqURLData?.h1} />
                </div>
            {/* <div>

                <div className="relative max-w-md w-full mt-4">

                    <input
                        type="text"
                        id="Search"
                        placeholder="Search for..."
                        className="w-full rounded-md border-gray-300 py-2.5 px-4 border-2 sm:text-sm"
                        onChange={event => setSearchQuery(event.target.value)}
                    />

                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button type="button" className="text-gray-600 hover:text-gray-700">
                            <span className="sr-only">Search</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </button>
                    </span>
                </div>
            </div> */}
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
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left '
                                                >
                                                    Employee
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                                >Phone</th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                                >Gender</th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                                >Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>{data && Array.isArray(data) && data.map((customer, _idx) =>
                                            <AllCustomerListRow
                                                key={_idx}
                                                customer={customer}
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

export default AllCustomerList;