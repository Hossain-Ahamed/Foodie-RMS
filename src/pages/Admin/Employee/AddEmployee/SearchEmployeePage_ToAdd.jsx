import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { BiEditAlt } from 'react-icons/bi';
import { IoPersonAddSharp, IoWarningOutline } from 'react-icons/io5';
import { IoIosAddCircleOutline } from 'react-icons/io';

const SearchEmployeePage_ToAdd = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const { branchID, res_id } = useRestauarantAndBranch();



    const axiosSecure = useAxiosSecure();



    /**
     * -----------------------------------------------------------------------------------
     *                              Searching Functions
     * 
     */

    const [SearchedResult, setSearchedResult] = useState([]);
    const [loadingOnSearch, setLoadingonSearch] = useState(false);
    const [SearchedValueReceived, setSearchedValueReceived] = useState(false);
    // trim and get the only data to search 
    function trimObjectFields(obj) {
        const trimmedObject = {};

        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (typeof value === 'string') {
                const trimmedValue = value.trim();
                if (trimmedValue !== '') {
                    trimmedObject[key] = trimmedValue;
                }
            } else {
                trimmedObject[key] = value;
            }
        });

        return trimmedObject;
    }


    // check if null submitted 
    function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const onSubmit = async (data) => {

        const trimmedData = trimObjectFields(data);

        if (isObjectEmpty(trimmedData)) {
            toast.error('No data inserted');
            return;
        }

        setLoadingonSearch(true);
        setSearchedResult(false);

        // search from server 

        // Todo: uncomment this to fetch
        // await axiosSecure.post('/search-employee-to-add', trimmedData)
        //     .then(res => {
        //         setSearchedResult(res.data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         toast.error(error?.code + " " + error?.response?.data?.message)
        //     })
        //     .finally(() => {

        //         setLoadingonSearch(false);
        //         setSearchedValueReceived(true);
        //     })





        // --------------------------
        // Todo: delete this to fetch
        setSearchedResult([
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
        ]);

    
        setLoadingonSearch(false)
        setSearchedValueReceived(true);
        // ---------------------------------

    }
    /**
     * --------------------------------------------------------------------------------
     */

    return (
        <section>
            <SetTitle title="Add Employee" />
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-7xl mx-auto flex flex-col items-center py-3 select-none ' autoComplete='off'>
                <SectionTitle h1="Search Employee" />
                <div className="w-full md:w-3/4 p-3 ">
                    <div className="px-3 pt-2 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                        <div className="flex flex-wrap pt-3 pb-5 -m-3">
                            {/* first name  */}
                            <div className="w-full md:w-1/2 px-3 pb-1">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">First name</p>
                                <input className="w-full px-4 py-1.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="John"
                                    {...register("f_name")} />
                                {errors.f_name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.f_name.message}</p>)}

                            </div>
                            {/* last name  */}
                            <div className="w-full md:w-1/2 px-3 pb-1">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-4-3">Last name</p>
                                <input className="w-full px-4 py-1.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="Doe"
                                    {...register("l_name")} />
                                {errors.l_name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.l_name.message}</p>)}

                            </div>

                            {/* email  */}
                            <div className="w-full md:w-1/2 px-3 pb-1">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-5-3">Email</p>
                                <input className="w-full px-4 py-1.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="email" placeholder="alex@example.com"
                                    {...register("email")} />
                                {errors.email?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.email.message}</p>)}
                                {errors.email?.type === "notEmail" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not an Email</p>)}

                            </div>

                            {/* mobile  */}
                            <div className="w-full md:w-1/2 px-3 pb-1">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-6-3">mobile number</p>
                                <input className="w-full px-4 py-1.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="tel" placeholder="01x xxx xxxx "
                                    {...register("mobile")} />
                                {errors.mobile?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.mobile.message}</p>)}
                                {errors.mobile?.type === "notmobile" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not a mobile number</p>)}

                            </div>





                            {/* NID  */}
                            <div className="w-full xl:w-3/4 px-3 pb-1">
                                <label htmlFor="nid" className="mb-1.5 font-medium text-base text-gray-800">
                                    NID
                                </label>
                                <input
                                    id="nid"
                                    className="w-full px-4 py-1.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="xxx xxxx xxxx xxx"
                                    {...register('nid')}
                                />
                                {errors.nid && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.nid.message}
                                    </p>
                                )}
                            </div>
                            <div className='w-full xl:w-1/4 max-w-56 h-full  px-4 flex justify-center items-center'>
                                <button type='submit' className="w-full mt-5 relative flex flex-wrap justify-center   py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button ">
                                    <p data-config-id="auto-txt-22-3">Search</p>

                                    <span className='absolute right-3 top-2'>
                                        <span className="sr-only">Search</span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                        </div>


                    </div>
                </div>


                {/* show search result here  */}
                <div className="w-full mt-3 p-3 md:w-3/4">
                    <div className="px-6  h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                        <div className='py-2'>
                            <div className='-mx-4 py-2 overflow-x-auto'>
                                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                    {
                                        SearchedResult &&
                                        Array.isArray(SearchedResult) &&
                                        SearchedResult.length > 0 && <>
                                            <table className='min-w-full leading-normal'>
                                                <thead>
                                                    <tr>
                                                        <th
                                                            scope='col'
                                                            className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                                        >
                                                            Employee
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                                        >UID</th>
                                                        <th
                                                            scope='col'
                                                            className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                                        >NID</th>
                                                        <th
                                                            scope='col'
                                                            className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                                        >
                                                            mobile
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                                        >
                                                            BirthDate
                                                        </th>


                                                        <th
                                                            scope='col'
                                                            className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                                        >
                                                            Add
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>{
                                                    SearchedResult.map((employee, _idx) => <tr key={_idx}>
                                                        <td className='px-2 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <div className='flex items-center '>
                                                                <div className='flex items-center gap-5 flex-col md:flex-row'>
                                                                    <div className=''>
                                                                        <img
                                                                            alt='profile'
                                                                            src={employee?.profilePhoto}
                                                                            className='mx-auto object-cover rounded h-10 w-15 '
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <span className='text-gray-900 whitespace-no-wrap block'>{employee?.f_name} {employee?.l_name}</span>
                                                                        <span className='text-gray-900 whitespace-no-wrap block'>{employee?.email}</span>
                                                                    </div>
                                                                </div>
                                                                <div className='ml-3'>
                                                                    {/* <p className='text-gray-900 whitespace-no-wrap'>{category?.categoryID}</p> */}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='px-2 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <span
                                                                className='text-gray-900 whitespace-no-wrap block'
                                                            >

                                                                {employee?.uid}
                                                            </span>
                                                        </td>
                                                        <td className='px-2 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <span
                                                                className='text-gray-900 whitespace-no-wrap block'
                                                            >

                                                                {employee?.nid}
                                                            </span>
                                                        </td>
                                                        <td className='px-2 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            {employee?.mobile}
                                                        </td>
                                                        <td className='px-2 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            {employee?.DOB}
                                                        </td>



                                                        <td className='py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <span
                                                                className='text-gray-900 whitespace-no-wrap flex flex-col md:flex-row gap-4 md:gap-0 items-center'
                                                            >
                                                                <Link title="Add to your team" to={`/restaurant/${res_id}/branch/${branchID}/add-existing-employee/${employee?._id}`} className="inline-flex ml-3 cursor-pointer text-gray-500 transition-colors duration-300 "> <IoIosAddCircleOutline className='w-5 h-5 text-green-400 hover:text-green-600' /></Link>
                                                            </span>
                                                        </td>

                                                    </tr>)}
                                                </tbody>
                                            </table>
                                        </>
                                    }



                                </div>
                                {
                                    SearchedResult &&
                                    Array.isArray(SearchedResult) &&
                                    SearchedResult.length === 0 &&
                                    SearchedValueReceived && <>

                                        <p className='text-sm px-4 text-center'> No matching employee profile found
                                            <span className='text-red-300 text-xs flex justify-center items-center mt-2'>
                                                <IoWarningOutline /> You can use fewer search filters to prevent duplicates
                                            </span>
                                        </p>
                                        <Link to={`/restaurant/${res_id}/branch/${branchID}/add-new-employee`} className="w-48 ml-auto mt-5 relative flex flex-wrap justify-center   py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button  items-center">
                                            Add New Employee <IoPersonAddSharp className='w-4 h-4 ml-4' />

                                        </Link>
                                    </>
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default SearchEmployeePage_ToAdd;