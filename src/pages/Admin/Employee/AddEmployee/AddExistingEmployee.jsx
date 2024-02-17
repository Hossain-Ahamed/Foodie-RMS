import React, { useState } from 'react';
import { SwalErrorShow, disableScroll_Number_Input, getCountries } from '../../../../assets/scripts/Utility';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { RiRadioButtonLine } from "react-icons/ri";
import { IoMdRadioButtonOff } from "react-icons/io";
import { toast } from 'react-hot-toast';
const AddExistingEmployee = () => {
    const { employeeID } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const countries = getCountries();
    const axiosSecure = useAxiosSecure();
    const [text, setText] = useState("Per Month Salary");

    const { res_id, branchID } = useRestauarantAndBranch();
    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['existing-employee-data', res_id],
        queryFn: async () => {


            const res = await axiosSecure.get(`/restaurant/${res_id}/existing-employee-data/${employeeID}`);



            //     data: {
            //         employeeData: {
            //             _id: "1",
            //             f_name: "Farhan Hasan",
            //             l_name: "Nilok",
            //             email: "nilok@gmail.com",

            //             mobile: "018399473783",
            //             gender: "Male",
            //             nid: "8349490384893",
            //             uid: "4385884935",

            //             DOB: "27-01-2001",
            //             profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
            //             streetAddress: "J A M T O L A",
            //             city: 'Narayanganj',
            //             stateProvince: 'Dhaka',
            //             postalCode: '435',
            //             country: "Bangladesh",

            //             emergencyName: "Md. Hossain Ahamed",
            //             emergencyRelation: "8",
            //             emergencyPhoneNumber: "01868726172",
            //             emergencyEmail: "hossainahamed6872@gmail.com",
            //             emergencyAddress: "J A M T O L A",

            //         },
            //         restaurantData: {


            //             "_id": "87342fdjskllf",
            //             "res_name": "Fuoco",
            //             "img": "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
            //             "branches": [
            //                 {
            //                     "branch_name": "Fouco Update",

            //                     "branchID": "q-Update-f-Bangladesh-1440-1705850705607"
            //                 },
            //                 {
            //                     "branch_name": "Fouco Chasara",

            //                     "branchID": "q-Chasara-f-Bangladesh-1440-1705850705607"
            //                 },
            //                 {
            //                     "branch_name": "Fouco jamtola",

            //                     "branchID": "q-jamtola-f-Bangladesh-1440-1705850705607"
            //                 },
            //                 {
            //                     "branch_name": "Fouco pagla",

            //                     "branchID": "q-pagla-f-Bangladesh-1440-1705850705607"
            //                 },
            //             ],



            //         }
            //     }
            // }


            // Set options array
            setValue('res_id', res?.data?.restaurantData?._id);
            setValue('res_img', res?.data?.restaurantData?.img);
            setValue('res_name', res?.data?.restaurantData?.res_name);



            // necessary data send to server for cross check 
            setValue('email', res?.data?.employeeData?.email);
            setValue('mobile', res?.data?.employeeData?.mobile);
            setValue('nid', res?.data?.employeeData?.nid);
            setValue('uid', res?.data?.employeeData?.uid);
            //----------------------------------------------------

            return res?.data;
        },

    });
    const navigate = useNavigate();
    const onSubmit = (formData) => {
        // console.log(formData);
        axiosSecure.post(`/add-an-employee-to-my-restaurant/${res_id}/${branchID}/employee/${data?.employeeData?._id}`, formData)
            .then(res => {
                toast.success("Successfully enlisted");
                navigate('/employee-list', { replace: true })
            }).catch(e => {
                console.error(e);
                SwalErrorShow(e);
            })


    };

    if (dataLoading) {
        return <LoadingPage />
    }

    if (dataError) {
        return <ErrorPage />
    }

    return (
        <>

            <SetTitle title="Add Employee" />
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-7xl mx-auto flex flex-col items-center pb-12 select-none ' autoComplete='off'>
                <SectionTitle h1="Employee Form" />
                {/* necessary info  */}
                <div className="w-full md:w-3/4 p-3 ">
                    <div className="p-6 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                        <div className="flex flex-wrap pb-3 -m-3">
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">First name</p>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" >{data?.employeeData?.f_name}</p>

                            </div>
                            {/* last name  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-4-3">Last name</p>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input">{data?.employeeData?.l_name}</p>

                            </div>

                            {/* email  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-5-3">Email</p>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.email}</p>

                            </div>

                            {/* phone  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-6-3">Phone number</p>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.mobile}</p>

                            </div>


                            {/* Gender  */}
                            <div className="w-full md:w-1/2 p-1.5">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-6-3">
                                    Gender
                                </p>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-400/40 rounded-lg sm:flex">
                                    {['Male', 'Female', 'Others'].map((gender) => (
                                        <li key={gender} className="w-full border-b  border-gray-400/40 sm:border-b-0 sm:border-r last:sm:border-r-0 ">
                                            <div className="flex items-center ">



                                                <label
                                                    htmlFor={`${gender.toLowerCase()}-gender`}
                                                    className="w-full py-3 px-3 text-sm font-medium text-gray-900 flex items-center"
                                                >
                                                    {
                                                        gender === data?.employeeData?.gender ? <RiRadioButtonLine /> : <IoMdRadioButtonOff />
                                                    }
                                                    {gender}
                                                </label>



                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {errors.gender && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.gender?.message}
                                    </p>
                                )}
                            </div>
                            {/* D.O.B  */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="dob" className="mb-1.5 font-medium text-base text-gray-800">
                                    Date of Birth
                                </label>
                                <p
                                    id="dob"
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.DOB}</p>
                            </div>
                            {/* NID  */}
                            <div className="w-full  p-3">
                                <label htmlFor="nid" className="mb-1.5 font-medium text-base text-gray-800">
                                    NID
                                </label>
                                <p
                                    id="nid"
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.nid}</p>
                            </div>


                        </div>

                        {/* pp */}
                        <p className="mt-3 mb-1.5 font-medium text-gray-800 text-base" data-config-id="auto-txt-10-3">
                            Profile Photo
                        </p>
                        <div className=''>

                            {/* iamge 1  */}
                            <div
                                className=" flex items-center justify-center relative "

                            >


                                <img src={data?.employeeData?.profilePhoto} alt="Uploaded" className=" rounded-2xl object-contain" />


                            </div>
                        </div>
                    </div>
                </div>

                {/* address  */}
                <div className="w-full md:w-3/4 p-3 ">
                    <div className="p-6 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                        <p className="mb-1.5 text-[18px] font-semibold text-gray-900" data-config-id="auto-txt-21-3">Current Address</p>
                        <div className="flex flex-wrap -m-3 mb-3">
                            {/* Street Address */}
                            <div className="w-full  p-3">
                                <label htmlFor="streetAddress" className="mb-1.5 font-medium text-base text-gray-800">
                                    Street Address
                                </label>
                                <p
                                    id="streetAddress"
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.streetAddress}</p>
                            </div>
                            {/* City/Town */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="city" className="mb-1.5 font-medium text-base text-gray-800">
                                    City/Town
                                </label>
                                <p

                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.city}</p>
                            </div>

                            {/* State / Province */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="stateProvince" className="mb-1.5 font-medium text-base text-gray-800">
                                    State / Province
                                </label>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.stateProvince}</p>
                            </div>

                            {/* ZIP / Postal Code */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="postalCode" className="mb-1.5 font-medium text-base text-gray-800">
                                    ZIP / Postal code
                                </label>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.postalCode}</p>
                            </div>

                            {/* Country */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="postalCode" className="mb-1.5 font-medium text-base text-gray-800">
                                    Country
                                </label>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.country}</p>
                            </div>



                        </div>

                    </div>

                </div>





                {/* emergency contact  */}
                <div className="w-full md:w-3/4 p-3">
                    <div className="p-6 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                        <p className="mb-1.5 text-[18px] font-semibold text-gray-900 " data-config-id="auto-txt-21-3">Emergency Contact</p>
                        <div className="flex flex-wrap -m-3 mb-3 border-gray-500/50">

                            {/* Emergency Name */}
                            <div className="w-full md:w-1/2 p-3 border-gray-500/50">
                                <label htmlFor="emergencyName" className="mb-1.5 font-medium text-base text-gray-800">
                                    Name
                                </label>
                                <p

                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.emergencyName}</p>
                            </div>

                            {/* Emergency Relation */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="emergencyRelation" className="mb-1.5 font-medium text-base text-gray-800">
                                    Relation
                                </label>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.emergencyRelation}</p>
                            </div>

                            {/* Emergency Phone Number */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="emergencyPhoneNumber" className="mb-1.5 font-medium text-base text-gray-800">
                                    Phone number
                                </label>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.mobile}</p>
                            </div>

                            {/* Emergency Email */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="emergencyEmail" className="mb-1.5 font-medium text-base text-gray-800">
                                    Email
                                </label>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.emergencyEmail}</p>
                            </div>

                            {/* Emergency Address */}
                            <div className="w-full p-3">
                                <label htmlFor="emergencyAddress" className="mb-1.5 font-medium text-base text-gray-800">
                                    Address
                                </label>
                                <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                >{data?.employeeData?.emergencyAddress}</p>
                            </div>
                        </div>

                    </div>

                </div>


                {/* salary  & job info*/}
                <div className="w-full md:w-3/4 p-3 mt-8">
                    <div className="p-6 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                        <div className="flex flex-wrap pb-3 -m-3">

                            {/* res name   */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Restaurant name</p>
                                <input className="read-only:cursor-not-allowed w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="John"
                                    {...register("res_name", {
                                        required: "*Restaurant Name is Required",
                                    })} readOnly />
                                {errors.res_name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.res_name.message}</p>)}

                            </div>
                            {/* res id   */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-4-3">Restaurant ID</p>
                                <input className="read-only:cursor-not-allowed w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="Doe"
                                    {...register("res_id", {
                                        required: "*restaurant ID is Required",

                                    })} readOnly />
                                {errors.res_id?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.res_id.message}</p>)}

                            </div>


                            {/* branch name   */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="Branch" className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-17-3">
                                    Branch Name
                                </label>
                                <div className="relative">
                                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z" fill="#8896AB"></path>
                                    </svg>
                                    <select
                                        id="Branch"
                                        className="appearance-none w-full py-2.5 px-4 text-gray-900 text-base font-normal bg-white border outline-none border-gray-400/40 hover:border-green-500 rounded-lg shadow-input"
                                        defaultValue=""
                                        {...register('branch_name', { required: '*Branch Name is required' })}

                                        onChange={(e) => { data?.restaurantData?.branches && Array.isArray(data?.restaurantData?.branches) && setValue('branchID', data.restaurantData?.branches.find(i => i.branch_name === e.target.value).branchID) }}
                                    >
                                        <option value="" disabled>Select Branch</option>
                                        {
                                            data?.restaurantData?.branches && Array.isArray(data?.restaurantData?.branches) && data?.restaurantData?.branches.map((index, _idx) => <option key={_idx} value={index?.branch_name}>{index?.branch_name}</option>)

                                        }
                                    </select>
                                </div>
                                {errors.branch_name && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.branch_name.message}
                                    </p>
                                )}
                            </div>


                            {/* branch id  */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="Branch-id" className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-17-3">
                                    Branch ID
                                </label>
                                <div className="relative">
                                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z" fill="#8896AB"></path>
                                    </svg>
                                    <select
                                        id="Branch"
                                        className="disabled:cursor-not-allowed  appearance-none w-full py-2.5 px-4 text-gray-900 text-base font-normal bg-white border outline-none border-gray-400/40 hover:border-green-500 rounded-lg shadow-input"
                                        defaultValue=""
                                        {...register('branchID', { required: '*Branch Name is required' })}

                                        disabled
                                    >
                                        <option value="" disabled>Select Branch ID</option>
                                        {
                                            data?.restaurantData?.branches && Array.isArray(data?.restaurantData?.branches) && data?.restaurantData?.branches.map((index, _idx) => <option key={_idx} value={index?.branchID}>{index?.branchID}</option>)

                                        }
                                    </select>
                                </div>
                                {errors.branch_name && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.branch_name.message}
                                    </p>
                                )}
                            </div>





                            {/* role  */}
                            <div className="w-full md:w-1/2 p-3 ">
                                <label htmlFor="role" className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-17-3">
                                    Role
                                </label>
                                <div className="relative">
                                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z" fill="#8896AB"></path>
                                    </svg>
                                    <select
                                        id="role"
                                        className="appearance-none w-full py-2.5 px-4 text-gray-900 text-base font-normal bg-white border outline-none border-gray-400/40 hover:border-green-500 rounded-lg shadow-input"
                                        defaultValue=""
                                        {...register('role', { required: '*Select Role is required' })}
                                    >
                                        <option value="" disabled>Select Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Kitchen Stuff">Kitchen Stuff</option>
                                        <option value="Customer Service">Customer Service</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                {errors.role && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.role.message}
                                    </p>
                                )}
                            </div>


                            {/* salary_type  */}
                            <div className="w-full md:w-1/2 p-3 ">
                                <label htmlFor="salary_type" className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-17-3">
                                    Salary Type
                                </label>
                                <div className="relative">
                                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z" fill="#8896AB"></path>
                                    </svg>
                                    <select
                                        id="salary_type"
                                        className="appearance-none w-full py-2.5 px-4 text-gray-900 text-base font-normal bg-white border outline-none border-gray-400/40 hover:border-green-500 rounded-lg shadow-input"
                                        defaultValue="Monthly"
                                        {...register('salary_type', { required: '*Select Role is required' })}
                                        onChange={(e) => { setValue('salary_type', e.target.value); setText(e.target.value === "Daily" ? "Per Day Salary" : "Per Month Salary") }}
                                    >
                                        <option value="" disabled>Select Salary Type</option>
                                        <option value="Monthly" >Monthly</option>
                                        <option value="Daily">Daily</option>
                                    </select>
                                </div>
                                {errors.salary_type && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.salary_type.message}
                                    </p>
                                )}
                            </div>


                            {/* Salary Unit amount    */}
                            <div className="w-full  p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">{text}</p>
                                <input className="read-only:cursor-not-allowed w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="number" placeholder="8000"
                                    {...register("salary_unit", {
                                        required: "*Salary amount is Required",
                                        validate: {
                                            notNumber: (value) => !isNaN(value)
                                        },
                                    })}
                                    onFocus={(e) => disableScroll_Number_Input(e)}
                                />
                                {errors.salary_unit?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.salary_unit.message}</p>)}
                                {errors.salary_unit?.type === "notNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not a number</p>)}

                            </div>


                        </div>

                        <button type='submit' className="flex flex-wrap justify-center w-full md:w-auto md:ml-auto px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button">
                            <p data-config-id="auto-txt-22-3">Save</p>
                        </button>

                    </div>
                </div>

            </form >
        </>
    );
};

export default AddExistingEmployee;