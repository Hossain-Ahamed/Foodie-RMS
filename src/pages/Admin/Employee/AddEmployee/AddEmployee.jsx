// EmployeehtmlForm.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCountries, validateEmail, validateMobileNumber } from '../../../../assets/scripts/Utility';
import toast from 'react-hot-toast';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useRestauarantAndBranch from './../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';


const AddEmployee = () => {
    const countries = getCountries();
    const axiosSecure = useAxiosSecure();
    const [text, setText] = useState("Per Month Salary");

    const { res_id } = useRestauarantAndBranch();
    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['branches', res_id],
        enabled: true,
        cacheTime: 0,
        queryFn: async () => {


            let res = await axiosSecure.get(`/restaurant/${res_id}/get-restaurant-name-and-all-branches`);


            res = {
                data: {


                    "_id": "87342fdjskllf",
                    "res_name": "Fuoco",
                    "img": "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    "branches": [
                        {
                            "branch_name": "Fouco Update",

                            "branchID": "q-Update-f-Bangladesh-1440-1705850705607"
                        },
                        {
                            "branch_name": "Fouco Chasara",

                            "branchID": "q-Chasara-f-Bangladesh-1440-1705850705607"
                        },
                        {
                            "branch_name": "Fouco jamtola",

                            "branchID": "q-jamtola-f-Bangladesh-1440-1705850705607"
                        },
                        {
                            "branch_name": "Fouco pagla",

                            "branchID": "q-pagla-f-Bangladesh-1440-1705850705607"
                        },
                    ],



                }
            }


            // Set options array
            setValue('res_id', res?.data?._id);
            setValue('res_img', res?.data?.img);
            setValue('res_name', res?.data?.res_name);


            return res?.data;
        },

    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // handle image
    const [selectedImage0, setSelectedImage0] = useState(null);

    const handleImageUpload0 = (event) => {
        const file = event.target.files[0];
        setSelectedImage0(URL.createObjectURL(file));

        setValue("profilePhoto", file);

    };

    const onSubmit = (data) => {
        console.log(data);
        if (!selectedImage0) {
            toast.error('Profile Photo needed');
            return;
        }


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
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-7xl mx-auto flex flex-col items-center py-12 select-none ' autoComplete='off'>
                <SectionTitle h1="Employee Form" />
                {/* necessary info  */}
                <div className="w-full md:w-3/4 p-3 mt-8">
                    <div className="p-6 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                        <div className="flex flex-wrap pb-3 -m-3">
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">First name</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="John"
                                    {...register("f_name", {
                                        required: "*Last Name is Required",
                                    })} />
                                {errors.f_name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.f_name.message}</p>)}

                            </div>
                            {/* last name  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-4-3">Last name</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="Doe"
                                    {...register("l_name", {
                                        required: "*First Name is Required",

                                    })} />
                                {errors.l_name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.l_name.message}</p>)}

                            </div>

                            {/* email  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-5-3">Email</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="email" placeholder="alex@example.com"
                                    {...register("email", {
                                        required: "*E-mail is Required",

                                        validate: {
                                            notEmail: (value) => validateEmail(value)
                                        },
                                    })} />
                                {errors.email?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.email.message}</p>)}
                                {errors.email?.type === "notEmail" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not an Email</p>)}

                            </div>

                            {/* phone  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-6-3">Phone number</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="tel" placeholder="01x xxx xxxx "
                                    {...register("mobile", {
                                        required: "*Contact number is Required",
                                        validate: {
                                            notPhone: (value) => validateMobileNumber(value)
                                        }
                                    })} />
                                {errors.mobile?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.mobile.message}</p>)}
                                {errors.mobile?.type === "notPhone" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not a phone number</p>)}

                            </div>


                            {/* Gender  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-6-3">
                                    Gender
                                </p>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-400/40 rounded-lg sm:flex">
                                    {['Male', 'Female', 'Others'].map((gender) => (
                                        <li key={gender} className="w-full border-b border-gray-400/40 sm:border-b-0 sm:border-r">
                                            <div className="flex items-center ps-3">
                                                <input
                                                    id={`${gender.toLowerCase()}-gender`}
                                                    type="radio"
                                                    value={gender}
                                                    {...register('gender', { required: "*select gender" })}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400/40 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor={`${gender.toLowerCase()}-gender`}
                                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                                                >
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
                                <input
                                    id="dob"
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="date"
                                    min="1800-01-01"
                                    max={new Date().toISOString().split('T')[0]}
                                    {...register('DOB', {
                                        required: '*Date of Birth is required',

                                    })}
                                />
                                {errors.DOB && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.DOB.message}
                                    </p>
                                )}
                            </div>
                            {/* NID  */}
                            <div className="w-full  p-3">
                                <label htmlFor="nid" className="mb-1.5 font-medium text-base text-gray-800">
                                    NID
                                </label>
                                <input
                                    id="nid"
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="xxx xxxx xxxx xxx"
                                    {...register('nid', {
                                        required: '*NID is required',
                                    })}
                                />
                                {errors.nid && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.nid.message}
                                    </p>
                                )}
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

                                {!selectedImage0 &&
                                    <>
                                        <div className="w-full">
                                            <div className="flex flex-wrap -m-3">
                                                <div className="w-full p-3">

                                                    <div className="relative flex flex-col items-center justify-center mb-6 p-6 h-44 text-center text-green-500 focus-within:border-green-500 border border-dashed border-gray-400/40 rounded-lg">
                                                        <svg className="mb-1.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <svg className="mb-1.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-1-3">
                                                                <path d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" fill="currentColor"></path>
                                                            </svg>
                                                        </svg>
                                                        <p className="mb-1 text-sm text-gray-800 font-medium">
                                                            <span className="text-gray-500" data-config-id="auto-txt-11-3">Click to Upload a file</span>
                                                            <span data-config-id="auto-txt-12-3">or drag and drop</span>
                                                        </p>
                                                        <p className="text-xs text-gray-500 font-medium" data-config-id="auto-txt-13-3">PNG, JPG, GIF or up to 10MB</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                }
                                {selectedImage0 && (
                                    <img src={selectedImage0} alt="Uploaded" className=" rounded-2xl object-contain" />
                                )}
                                <input

                                    type="file"
                                    accept="image/*"
                                    className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                                    onChange={handleImageUpload0}

                                />
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
                                <input
                                    id="streetAddress"
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="Enter your street address"
                                    {...register('streetAddress', {
                                        required: '*Street Address is required',
                                    })}
                                />
                                {errors.streetAddress && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.streetAddress.message}
                                    </p>
                                )}
                            </div>
                            {/* City/Town */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="city" className="mb-1.5 font-medium text-base text-gray-800">
                                    City/Town
                                </label>
                                <input
                                    {...register('city', { required: 'City/Town is required' })}
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="Enter your city/town"
                                />
                                {errors.city && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>

                            {/* State / Province */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="stateProvince" className="mb-1.5 font-medium text-base text-gray-800">
                                    State / Province
                                </label>
                                <input
                                    {...register('stateProvince', { required: 'State / Province is required' })}
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="Enter your state/province"
                                />
                                {errors.stateProvince && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.stateProvince.message}
                                    </p>
                                )}
                            </div>

                            {/* ZIP / Postal Code */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="postalCode" className="mb-1.5 font-medium text-base text-gray-800">
                                    ZIP / Postal code
                                </label>
                                <input
                                    {...register('postalCode', { required: 'ZIP / Postal code is required' })}
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="ZIP / Postal code"
                                />
                                {errors.postalCode && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.postalCode.message}
                                    </p>
                                )}
                            </div>

                            {/* Country */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="country" className="mb-1.5 font-medium text-base text-gray-800">
                                    Country
                                </label>
                                <div className="relative">
                                    <svg className="absolute right-4 top-1/2 transhtmlForm -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-2-3">
                                        <path d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z" fill="#8896AB"></path>
                                    </svg>
                                    <select
                                        defaultValue=""
                                        {...register('country', { required: 'Country is required' })}
                                        className="appearance-none w-full py-2.5 px-4 text-gray-900 text-base font-normal bg-white border outline-none border-gray-400/40 hover:border-green-500 rounded-lg shadow-input"
                                    >
                                        <option value="" disabled>Select Country</option>
                                        {
                                            countries.map(i => <option key={i?.alpha_3_code} value={i?.en_short_name}>{i.en_short_name}</option>)
                                        }
                                    </select>
                                </div>
                                {errors.country && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.country.message}
                                    </p>
                                )}
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

                                        onChange={(e) => { data?.branches && Array.isArray(data?.branches) && setValue('branchID', data.branches.find(i => i.branch_name === e.target.value).branchID) }}
                                    >
                                        <option value="" disabled>Select Branch</option>
                                        {
                                            data?.branches && Array.isArray(data?.branches) && data?.branches.map((index, _idx) => <option key={_idx} value={index?.branch_name}>{index?.branch_name}</option>)

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
                                            data?.branches && Array.isArray(data?.branches) && data?.branches.map((index, _idx) => <option key={_idx} value={index?.branchID}>{index?.branchID}</option>)

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
                                <input className="read-only:cursor-not-allowed w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="8000"
                                    {...register("salary_unit", {
                                        required: "*Salary amount is Required",
                                        validate: {
                                            notNumber: (value) => !isNaN(value)
                                        },
                                    })} />
                                {errors.salary_unit?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.salary_unit.message}</p>)}
                                {errors.salary_unit?.type === "notNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not a number</p>)}

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
                                <input
                                    {...register('emergencyName', { required: 'Name is required' })}
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="Emergency contact name"
                                />
                                {errors.emergencyName && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.emergencyName.message}
                                    </p>
                                )}
                            </div>

                            {/* Emergency Relation */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="emergencyRelation" className="mb-1.5 font-medium text-base text-gray-800">
                                    Relation
                                </label>
                                <input
                                    {...register('emergencyRelation', { required: 'Relation is required' })}
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="Relation to the person"
                                />
                                {errors.emergencyRelation && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.emergencyRelation.message}
                                    </p>
                                )}
                            </div>

                            {/* Emergency Phone Number */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="emergencyPhoneNumber" className="mb-1.5 font-medium text-base text-gray-800">
                                    Phone number
                                </label>
                                <input
                                    {...register('emergencyPhoneNumber', { required: 'Phone number is required' })}
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="tel"
                                    placeholder="01x xxx xxxx"
                                />
                                {errors.emergencyPhoneNumber && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.emergencyPhoneNumber.message}
                                    </p>
                                )}
                            </div>

                            {/* Emergency Email */}
                            <div className="w-full md:w-1/2 p-3">
                                <label htmlFor="emergencyEmail" className="mb-1.5 font-medium text-base text-gray-800">
                                    Email
                                </label>
                                <input
                                    {...register('emergencyEmail', { required: 'Email is required' })}
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="email"
                                    placeholder="Emergency contact email"
                                />
                                {errors.emergencyEmail && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.emergencyEmail.message}
                                    </p>
                                )}
                            </div>

                            {/* Emergency Address */}
                            <div className="w-full p-3">
                                <label htmlFor="emergencyAddress" className="mb-1.5 font-medium text-base text-gray-800">
                                    Address
                                </label>
                                <input
                                    {...register('emergencyAddress', { required: 'Address is required' })}
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="ie : black St. VIC Australia 3001"
                                />
                                {errors.emergencyAddress && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.emergencyAddress.message}
                                    </p>
                                )}
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

export default AddEmployee;
