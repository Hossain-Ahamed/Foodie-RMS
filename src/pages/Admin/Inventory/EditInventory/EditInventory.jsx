import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import SetTitle from '../../../Shared/SetTtitle/SetTitle'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SwalErrorShow, getUnits } from '../../../../assets/scripts/Utility'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch'
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage'
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
const EditInventory = () => {
    // sInventory catch the purchase if user select option other than purchase vendor will be disabled
    const [expenseCategory, SetExpenseCategory] = useState('');
    const [optionList, setOptionList] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { branchID, res_id } = useRestauarantAndBranch();
    const units = getUnits();
    const { id } = useParams()
    const drowpdownCategory = ["Purchase", "Salaries"]
    const { refetch: dataRefetch, data: data = {}, isLoading, error: dataError,  } = useQuery({
        queryKey: ['inventory', res_id, branchID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/restaurant/${res_id}/branch/${branchID}/get-inventory-data/${id}`)

            // return res.data.categories;
            setValue("itemName", res?.data?.itemData?.itemName);
            setValue("vendorName", res?.data?.itemData?.vendorName);
            setValue("unitType", res?.data?.itemData?.unitType);
            setValue("unit", res?.data?.itemData?.unit);
            setValue("unitPrice", res?.data?.itemData?.unitPrice);
            return res.data;
            // return {
            //     vendors: [
            //         {
            //             "name": "Kortoa Services",
            //             "_id": "1"
            //         },
            //         {
            //             "name": "Vai vai catering",
            //             "_id": "2"
            //         },
            //         {
            //             "name": "Mozid Meats",
            //             "_id": "3"
            //         },
            //         {
            //             "name": "Mr. Chicken",
            //             "_id": "4"
            //         },
            //         {
            //             "name": "Grocery point",
            //             "_id": "5"
            //         },
            //         {
            //             "name": "Nayan Masala stall",
            //             "_id": "6"
            //         }
            //     ],

            //     employees: [
            //         {
            //             "name": "Tahsin",
            //             "_id": "malu"
            //         },
            //         {
            //             "name": "Pathul",
            //             "_id": "shemale"
            //         },
            //         {
            //             "name": "Hossain",
            //             "_id": "gay"
            //         },
            //         {
            //             "name": "Nilok",
            //             "_id": "Straight"
            //         },
            //         {
            //             "name": "Mokles",
            //             "_id": "null"
            //         },
            //         {
            //             "name": "Satoru",
            //             "_id": "Gojo"
            //         }
            //     ]
            // }

        }
    })

    const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField, control } = useForm({
        defaultValues: {
            active: true,
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        axiosSecure.patch(`/admin/restaurant/${res_id}/branch/${branchID}/edit-inventory/${id}`, data)
            .then(res => {
                toast.success('Inventory Edited Successfully')
                navigate('/inventory-report')
            })
            .catch(err => SwalErrorShow(err))

        // if (!selectedImage0) {

        //     toast.error('Cover Photo needed');
        //     return;
        // }


    };

    if (isLoading) {
        return <LoadingPage />
    }

    if (dataError) {
        return <ErrorPage />
    }


    return (
        <section className='max-w-7xl mx-auto py-8'>
            <SectionTitle h1="Edit Inventory" />
            <SetTitle title="Edit Inventory" />
            <form onSubmit={handleSubmit(onSubmit)} className='mt-3 px-6 mx-auto py-5 border border-gray-300 overflow-hidden bg-white rounded-md max-w-4xl'>

                <div className="w-full">
                    <div className=" h-full">
                        {/* category  */}

                        <div className="flex flex-wrap pb-3 m-3 border-1 rounded">
                            <div className="w-full p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Item Name</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="Chicken"
                                    {...register("itemName", {
                                        required: "*Item Name is Required",
                                    })} />
                                {errors.itemName?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.itemName?.message}</p>)}
                            </div>

                            <div className="w-full md:w-1/2 p-3">
                                <select
                                    label="Select Vendor Name"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"

                                    defaultValue=""
                                    {...register("vendorName", {
                                        required: "*Vendor Name is Required",
                                    })}
                                >
                                    <option value="" disabled>
                                        Select Vendor Name
                                    </option>

                                    {data && Array.isArray(data.vendorNames) && data.vendorNames.map((vendor, _idx) => (
                                        <option key={_idx} value={vendor}>
                                            {vendor}
                                        </option>
                                    ))}
                                </select>
                                {errors.category?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.category?.message}</p>)}
                            </div>

                            <div className="w-full md:w-1/2 p-3">
                                <select
                                    label="Select Unit Type"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"

                                    defaultValue=""
                                    {...register("unitType", {
                                        required: "*Unit Type is Required",
                                    })}
                                >
                                    <option value="" disabled>
                                        Select Unit Type
                                    </option>

                                    {units.map((item, _idx) => (
                                        <option key={_idx} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                {errors.unitType?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.unitType?.message}</p>)}
                            </div>


                            {/* active  */}
                            {/* <div className="w-full mt-1 p-3">
                                <div role="alert" className="rounded-xl border border-gray-300 bg-white p-4">
                                    <div className="flex items-start gap-4">
                                        <span className="text-green-600">
                                            <Checkbox className='p-4' onValueChange={(e) => { setValue('active', e) }} defaultSelected></Checkbox>
                                        </span>

                                        <div className="flex-1">
                                            <strong className="block font-semibold text-gray-900">Active</strong>

                                            <p className="mt-1 text-sm text-gray-700">Only active Dishes will be visible in the Sales & Billing App, e-Menu and e-Restaurant.</p>
                                        </div>

                                    </div>
                                </div>

                            </div> */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Unit</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="10"
                                    {...register("unit", {
                                        required: "*Unit is Required",
                                    })} />
                                {errors.unit?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.unit?.message}</p>)}
                            </div>

                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Unit Price</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="450"
                                    {...register("unitPrice", {
                                        required: "*Unit Price is Required",
                                    })} />
                                {errors.unitPrice?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.unitPrice?.message}</p>)}
                            </div>

                        </div>

                    </div>
                </div>



                <div className='w-full h-full p-3 select-none'>
                    {/* -------------------------------------------------------------------------------------------- */}
                    <div className='flex flex-wrap justify-center items-end gap-3 p-1'>
                        {/* save button  */}
                        <button type='submit' className="flex flex-wrap justify-center w-full max-w-96  px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button">
                            <p data-config-id="auto-txt-22-3">Update</p>
                        </button>
                    </div>
                </div>

            </form>
        </section>
    )
}

export default EditInventory; 