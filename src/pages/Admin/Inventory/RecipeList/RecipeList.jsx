import React, { useState } from 'react'
import SetTitle from '../../../Shared/SetTtitle/SetTitle'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import { useFieldArray, useForm } from 'react-hook-form';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';
import { MdDelete } from 'react-icons/md';
import { CiSquarePlus } from 'react-icons/ci';

const AddRecipe = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField, control } = useForm({
        defaultValues: {
            active: true,
        },
    });

    const { fields: optionFields, append: optionAppend, remove: optionRemove, } = useFieldArray({
        control,
        name: 'ingredients',
    });
    const { branchID, res_id } = useRestauarantAndBranch();
    const { refetch, data: data = [], isLoading, error } = useQuery({
        queryKey: ['employee-list', branchID, res_id],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/admin/get-all-dishes/${branchID}?currentPage=${currentPage}&dataSize=${selectedRange}&status=${selectActive}`);

            const data = {
                dish: "Mexican Chao",
                ingredients: [
                    {
                        itemName: "Mexican Thai Noodle",
                        unit: 4
                    }
                ]
            }
            setValue("ingredients", data.ingredients)
            return data
            // return res.data
        }
    })
    const onSubmit = async (data) => {
        console.log(data);

        // setLoading(true)
        // imageUpload(data?.img)
        //     .then(res => {
        //         data.img = res?.data?.display_url
        //         axiosSecure.post(`/admin/${res_id}/add-new-dishes/${branchID}`, data)
        //             .then(res => {
        //                 toast.success('Dish Added Successfully')
        //                 resetField("active")
        //                 resetField("options")
        //                 resetField("addOn")
        //                 resetField("category")
        //                 resetField("title")
        //                 resetField("price")
        //                 resetField("offerPrice")
        //                 resetField("preparation_cost")
        //                 resetField("sales_tax")
        //                 resetField("supplementary_duty")
        //                 resetField("img")
        //                 setDescriptionContent("");
        //                 navigate('/dish-list')
        //             })
        //             .catch(err => SwalErrorShow(err))
        //     })
        //     .catch(err => SwalErrorShow(err))
        //     .finally(() => setLoading(false))


    };
    if (isLoading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }
    return (
        <section className='max-w-7xl mx-auto py-8'>
            <ScrollToTop />
            <SectionTitle h1="Add Recipe" />
            <SetTitle title="Add Recipe" />
            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto max-w-xl px-6 py-5 mt-3 border border-gray-300 overflow-hidden bg-white rounded-md shadow-dashboard'>

                <div className="w-full  ">
                    <div className=" h-full">
                        {/* category  */}
                        <div className="flex flex-wrap pb-3 m-3 border-1 rounded">
                            <div className="w-full  p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Title</p>
                                <input defaultValue={data.dish} className="disabled:cursor-not-allowed w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="ie: Rice Bowl"
                                    {...register("dish", {
                                        required: "*Dish  is Required",
                                    })} disabled />
                                {errors.dish?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.dish?.message}</p>)}

                            </div>
                        </div>
                    </div>
                </div>



                <div className='w-full h-full p-3 select-none'>
                    {/* --------------------------------------------------------------------------
          ------------------OPTIONS-----------------------------------------------------
          ------------------------------------------------------------------------------ */}
                    <div className="flex flex-wrap pb-3 m-3 border-1 rounded p-2">
                        <div className="p-4 h-full w-full overflow-hidden bg-white shadow-dashboard">
                            <p className="mb-1.5 text-[18px] font-semibold text-gray-900 text-coolGray-800" data-config-id="auto-txt-21-3">Ingredients</p>
                            <small>Add item and units to the ingredients</small>
                            {optionFields.map((branch, index) => (
                                <div key={index} className="flex flex-wrap items-center p-4 my-1 mb-3 border rounded relative">

                                    {/* */}
                                    <div className="w-full md:w-1/2 p-1">

                                        <input
                                            {...register(`ingredients[${index}].itemName`, { required: 'Item Name is required' })}
                                            className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                                            type="text"
                                            placeholder="item name"
                                        />
                                        {errors.ingredients && errors.ingredients[index]?.itemName && (
                                            <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                                                {errors.ingredients[index].itemName.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full md:w-1/2 p-1">

                                        <input
                                            {...register(`ingredients[${index}].unit`, { required: 'Unit is reequired' })}
                                            className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                                            type="number"
                                            placeholder="unit"
                                        />
                                        {errors.ingredients && errors.ingredients[index]?.unit && (
                                            <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                                                {errors.ingredients[index].unit.message}
                                            </p>
                                        )}
                                    </div>





                                    {/* Remove  Button */}
                                    <div className='w-full flex flex-wrap justify-end items-center gap-2'>
                                        <button
                                            type="button"
                                            onClick={() => optionRemove(index)}
                                            className="flex-shrink-0 px-2 py-2 bg-slate-200 hover:bg-slate-300 font-medium text-sm text-white border border-slate-400 rounded-md shadow-button"
                                        >
                                            <MdDelete className='text-red-300' />
                                        </button>

                                    </div>

                                </div>
                            ))}

                            {/* add option  */}
                            <div className='w-full flex flex-wrap justify-start items-center gap-2'>
                                <button
                                    type="button"
                                    onClick={() => optionAppend({})}
                                    className="flex   font-medium text-sm  rounded-md shadow-button "
                                >
                                    <CiSquarePlus className='text-green-400 text-5xl' title='Add New' />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* -------------------------------------------------------------------------------------------- */}
                    <div className=' flex flex-wrap justify-center items-end gap-3 p-1'>
                        {/* save button  */}

                        <button type='submit' className="flex flex-wrap justify-center w-full max-w-96  px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button">
                            <p data-config-id="auto-txt-22-3">Create</p>
                        </button>


                    </div>
                </div>

            </form>
        </section>
    )
}

export default AddRecipe;