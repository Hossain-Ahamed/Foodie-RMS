import React, { useState } from 'react';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { getAllDistricts, getCountries, getDivisions, getProvinceOfSelectedCity } from '../../../../assets/scripts/Utility';
import { useForm } from 'react-hook-form';

const AddBranch = () => {
    const { res_id } = useRestauarantAndBranch();
    const countries = getCountries();
    const [loading, setLoading] = useState(true);
    // const axiosSecure = useAxiosSecure();

    const AllDistricts = getAllDistricts();
    const AllDivisions = getDivisions();

    const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <>
            <p className="mb-1.5 text-[18px] font-semibold text-gray-900 text-coolGray-800" data-config-id="auto-txt-21-3">Branch Addresses</p>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-7xl mx-auto flex flex-col items-center py-12 select-none ' autoComplete='off'>

                <div className="w-full  p-3">
                    <label htmlFor={`name`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        Branch Name
                    </label>
                    <input
                        {...register(`name`, { required: 'Branch Name is required' })}
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Enter branch name"
                    />
                    {errors.branches && errors?.name && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors.name?.message}
                        </p>
                    )}
                </div>
                <div className="w-full p-3">
                    <label htmlFor={`streetAddress`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        Street Address
                    </label>
                    <input
                        id={`streetAddress`}
                        {...register(`streetAddress`, {
                            required: '*Street Address is required',
                        })}
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Enter your street address"
                    />
                    {errors.branches && errors?.streetAddress && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors.streetAddress.message}
                        </p>
                    )}
                </div>


                <div className="w-full md:w-1/2 p-3">
                    <label htmlFor={`city`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        City/Town
                    </label>
                    <select

                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"

                        defaultValue=""
                        {...register(`city`, { required: 'City/Town is required' })}
                        onChange={(e) => { setValue(`city`, e.target.value); setValue(`stateProvince`, getProvinceOfSelectedCity(e.target.value)) }}
                    >
                        <option value="" disabled>
                            Select City
                        </option>

                        {AllDistricts.map((item, _idx) => (
                            <option key={item?.name} value={item?.name}>
                                {item?.name}
                            </option>
                        ))}
                    </select>

                    {errors.branches && errors?.city && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors.city.message}
                        </p>
                    )}
                </div>


                <div className="w-full md:w-1/2 p-3">
                    <label htmlFor={`city`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        State / Province
                    </label>
                    <select
                        label="Select Dish Category"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"

                        defaultValue=""
                        {...register(`stateProvince`, { required: 'State / Province is required' })}
                    >
                        <option value="" disabled>
                            Select Province / State
                        </option>

                        {AllDivisions.map((item, _idx) => (
                            <option key={item?.name} value={item?.name}>
                                {item?.name}
                            </option>
                        ))}
                    </select>


                    {errors.branches && errors?.stateProvince && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors.stateProvince.message}
                        </p>
                    )}
                </div>

                <div className="w-full md:w-1/2 p-3">
                    <label htmlFor={`postalCode`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        ZIP / Postal code
                    </label>
                    <input
                        {...register(`postalCode`, { required: 'ZIP / Postal code is required' })}
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="ZIP / Postal code"
                    />
                    {errors.branches && errors?.postalCode && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors.postalCode.message}
                        </p>
                    )}
                </div>


                <div className="w-full md:w-1/2 p-3">
                    <label htmlFor={`country`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        Country
                    </label>
                    <div className="relative">
                        <svg className="absolute right-4 top-1/2 transhtmlForm -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-2-3">
                            <path d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z" fill="#8896AB"></path>
                        </svg>
                        <select
                            {...register(`country`, { required: 'Country is required' })}
                            defaultValue="Bangladesh"
                            className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg appearance-none"
                        >
                            <option value="" disabled>Select Country</option>
                            {countries.map((country, i) => (
                                <option key={i + 0} value={country?.en_short_name} className='text-black'>
                                    {country?.en_short_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.branches && errors?.country && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors.country.message}
                        </p>
                    )}


                </div>







                <div className="flex items-start mb-5 mt-2 pl-2">
                    <div className="flex items-center h-5">
                        <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="/privacy-policy" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                </div>

                <div className='my-4 w-full flex flex-wrap justify-center items-center gap-2'>
                    <button
                        type='submit' className="flex flex-wrap justify-center  px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button">
                        <p data-config-id="auto-txt-22-3">Submit</p>
                    </button>
                </div>
            </form >




        </>
    );
};

export default AddBranch;