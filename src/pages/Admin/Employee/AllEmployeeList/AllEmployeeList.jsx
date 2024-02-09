import React, { useState } from 'react';
// import TableComponent from '../../../../components/Table/Table';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
// import EmployeeListRow from './EmployeeListRow';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import AllEmployeeListRow from './AllEmployeeListRow';
// "name", "role", "status", "actions", 'id'
const AllEmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('')
    const { branchID, res_id } = useRestauarantAndBranch();
    const { refetch, data: data = [], isLoading, error } = useQuery({
        queryKey: ['all-employee-list', searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/all-employee-list`);
            return [
                {
                    _id: "1",
                    f_name: "Farhan Hasan",
                    l_name: "Nilok",
                    email: "nilok@gmail.com",
                    branchName: "Fouco",
                    mobile: "018399473783",
                    gender: "Male",
                    nid: "8349490384893",
                    uid: "4385884935",
                    role: "Admin",
                    DOB: "27-01-2001",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    streetAddress: "J A M T O L A",
                    city: 'Narayanganj',
                    stateProvince: 'Dhaka',
                    postalCode: '435',
                    country: "Bangladesh",
                },
                {
                    _id: "2",
                    f_name: "Fattan Prodan",
                    l_name: "Pathul",
                    email: "nilok@gmail.com",
                    branchName: "Fouco",
                    mobile: "018399473783",
                    gender: "Female",
                    nid: "8349490384893",
                    uid: "4385884935",
                    role: "Customer Service",
                    DOB: "27-01-2001",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    streetAddress: "J A M T O L A",
                    city: 'Narayanganj',
                    stateProvince: 'Dhaka',
                    postalCode: '435',
                    country: "Bangladesh",
                },
                {
                    _id: "3",
                    f_name: "Hossain Ahamed",
                    l_name: "Malu",
                    email: "malu@gmail.com",
                    branchName: "Fouco",
                    mobile: "018399473783",
                    gender: "Shemale",
                    nid: "8349490384893",
                    uid: "4385884935",
                    role: "Kitchen Staff",
                    DOB: "27-01-2001",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    streetAddress: "J A M T O L A",
                    city: 'Narayanganj',
                    stateProvince: 'Dhaka',
                    postalCode: '435',
                    country: "Bangladesh",
                },
                {
                    _id: "4",
                    f_name: "Gazi Fuad",
                    l_name: "Tahsin",
                    email: "sodome@gmail.com",
                    branchName: "Fouco",
                    mobile: "018399473783",
                    gender: "Sodome",
                    nid: "8349490384893",
                    uid: "4385884935",
                    role: "Kitchen Staff",
                    DOB: "27-01-2001",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    streetAddress: "J A M T O L A",
                    city: 'Narayanganj',
                    stateProvince: 'Dhaka',
                    postalCode: '435',
                    country: "Bangladesh",
                },
                {
                    _id: "5",
                    f_name: "Gazi Fuad",
                    l_name: "Tahsin",
                    email: "sodome@gmail.com",
                    branchName: "Fouco",
                    mobile: "018399473783",
                    gender: "Sodome",
                    nid: "8349490384893",
                    uid: "4385884935",
                    role: "Others",
                    DOB: "27-01-2001",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    streetAddress: "J A M T O L A",
                    city: 'Narayanganj',
                    stateProvince: 'Dhaka',
                    postalCode: '435',
                    country: "Bangladesh",
                },
                {
                    _id: "6",
                    f_name: "Gazi Fuad",
                    l_name: "Tahsin",
                    email: "sodome@gmail.com",
                    branchName: "Fouco",
                    mobile: "018399473783",
                    gender: "Sodome",
                    nid: "8349490384893",
                    uid: "4385884935",
                    role: "Admin",
                    DOB: "27-01-2001",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    streetAddress: "J A M T O L A",
                    city: 'Narayanganj',
                    stateProvince: 'Dhaka',
                    postalCode: '435',
                    country: "Bangladesh",
                },
            ]
        }
    })
    return (
        <section className='max-w-[1600px] mx-auto mt-5'>
            <SetTitle title="All Employee List" />

            <div className='flex  gap-3 '>
                <div className='w-full '>
                    <SectionTitle h1="All Employee List" />
                </div>
                <div>
                    <Link to={`/add-employee`} className='flex justify-center items-center gap-2 text-white font-medium  px-4 py-2 bg-green-400 rounded-md text-nowrap '>Add Employee <IoAddOutline className='text-white' /></Link>

                </div>

            </div>
            <div>

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
            </div>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                    >
                                        Employee
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                    >Branch</th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                    >Employee ID</th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                    >
                                        mobile
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{data && data.map((employee, _idx) => <AllEmployeeListRow key={_idx} employee={employee} />)}</tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AllEmployeeList;