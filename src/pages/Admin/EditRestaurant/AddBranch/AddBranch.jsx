import React from 'react';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { getCountries } from '../../../../assets/scripts/Utility';
import { FormProvider, useForm } from 'react-hook-form';
const AddBranch = () => {
    const countries = getCountries();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        getValues,
    } = useForm();
    const { res_id } = useRestauarantAndBranch();
    const navigate = useNavigate();

    if (!res_id) {
        Swal.fire({
            icon: 'error',
            title: 'No restaurant is selected',
        });
        navigate('/', { replace: true });
    }

    const onSubmit = (data) => {
        console.log(data);
    };

    const generateBranchID = () => {
        const branch = getValues();
    
        // Extract values from the branch object
        const { streetAddress, city, stateProvince, country, postalCode } = branch;
    
        // Check if any of the required fields are missing
        if (!streetAddress || !city || !stateProvince || !country || !postalCode) {
            Swal.fire({
                icon: 'error',
                title: 'Necessary Data missing',
                text: 'Insert all the Information',
            });
            return;
        }
    
        // Combine values with hyphens
        const combinedInfo = `${streetAddress}-${city}-${stateProvince}-${country}-${postalCode}`;
    
        // Append Date.now() to make it unique
        const uniqueBranchID = `${combinedInfo}-${Date.now()}`;
        
        // Set the value in the form
        setValue('branchID', uniqueBranchID);
    };
    
 
     
     
       
  

    return (
        <section className='mt-10' aria-label='new banch add form'>
            <SetTitle title="Add-branch" />
            <SectionTitle h1="Add New Branch" />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap mt-10 mb-5 p-5 md:px-7 max-w-7xl mx-auto border border-gray-300 rounded-md">



                {/* Street Address */}
                <div className="w-full p-3 ">
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
                    {errors.streetAddress && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors?.streetAddress.message}
                        </p>
                    )}
                </div>

                {/* City/Town */}
                <div className="w-full md:w-1/2 p-3">
                    <label htmlFor={`city`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        City/Town
                    </label>
                    <input
                        {...register(`city`, { required: 'City/Town is required' })}
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Enter your city/town"
                    />
                    {errors.city && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors?.city.message}
                        </p>
                    )}
                </div>

                {/* State / Province */}
                <div className="w-full md:w-1/2 p-3">
                    <label htmlFor={`stateProvince`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        State / Province
                    </label>
                    <input
                        {...register(`stateProvince`, { required: 'State / Province is required' })}
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Enter your state/province"
                    />
                    {errors.stateProvince && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors?.stateProvince.message}
                        </p>
                    )}
                </div>

                {/* ZIP / Postal Code */}
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
                    {errors.postalCode && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors?.postalCode.message}
                        </p>
                    )}
                </div>

                {/* Country */}
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
                            defaultValue=""
                            className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg appearance-none"
                        >
                            <option value="" disabled>Select Country</option>
                            {countries.map((country, i) => (
                                <option key={i} value={country?.en_short_name} className='text-black'>
                                    {country?.en_short_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.country && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors?.country.message}
                        </p>
                    )}
                </div>
                <div className="w-full md:w-1/2 p-3">
                    <label htmlFor={`name`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        Branch Name
                    </label>
                    <input
                        {...register(`branch_name`, { required: 'Branch Name is required' })}
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Enter branch name"
                    />
                    {errors.branch_name && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors.branch_name?.message}
                        </p>
                    )}
                </div>


                <div className="w-full md:w-1/2 p-3 relative">
                    <label htmlFor={`branchID`} className="mb-1.5 font-medium text-base text-coolGray-800">
                        Branch ID
                    </label>
                    <input
                        {...register(`branchID`, { required: 'branch ID is required' })}
                        className="read-only:cursor-not-allowed w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Branch ID"
                        readOnly
                    />
                    <button
                        type="button"
                        onClick={() => generateBranchID()}
                        className="absolute right-4 top-10 flex-shrink-0 px-3 py-2 bg-blue-500 hover:bg-blue-600 font-medium text-sm text-white border border-blue-500 rounded-md shadow-button"
                    >
                        Generate
                    </button>
                    {errors.branchID && (
                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                            {errors?.branchID.message}
                        </p>
                    )}
                </div>


                {/* add branch  */}
                <div className='w-full flex flex-wrap justify-start items-center gap-2'>
                    <button
                        type="submit"

                        className="flex-shrink-0 px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                    >
                        Add Branch
                    </button>
                </div>
            </form>


        </section>
    );
};

export default AddBranch;