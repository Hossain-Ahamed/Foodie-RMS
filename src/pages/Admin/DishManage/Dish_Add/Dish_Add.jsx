import React, { useEffect, useState } from 'react'
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import SetTitle from '../../../Shared/SetTtitle/SetTitle'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Checkbox } from '@nextui-org/react'
import Dish_Add_Description from './Dish_Add_Description';
import { MdOutlinePercent } from 'react-icons/md'
import { SwalErrorShow, imageUpload, validateSalesTax } from '../../../../assets/scripts/Utility'
import { MdDelete } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch'
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage'
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
const Dish_Add = () => {

  const [loading,setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { branchID, res_id } = useRestauarantAndBranch();

  const { refetch: categoryRefetch, data: data = [], isLoading, error } = useQuery({
    queryKey: ['categories', res_id, branchID],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/get-all-categories-name/${branchID}`)
      return res?.data;

    }
  })
  const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField, control } = useForm({
    defaultValues: {
      active: true,
    },
  });

  const { fields: optionFields, append: optionAppend, remove: optionRemove, } = useFieldArray({
    control,
    name: 'options',
  });
  const { fields: addOnFields, append: addOnAppend, remove: addOnRemove, } = useFieldArray({
    control,
    name: 'addOn',
  });


  const [descriptionContent, setDescriptionContent] = useState("");

  const [selectedImage0, setSelectedImage0] = useState(null);

  const handleImageUpload0 = (event) => {
    const file = event.target.files[0];
    setSelectedImage0(URL.createObjectURL(file));
    setValue("img", file);

  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data)
    if (!selectedImage0) {

      toast.error('Cover Photo needed');
      return;
    }

    setLoading(true)
    imageUpload(data?.img)
      .then(res => {
        data.img = res?.data?.display_url
        axiosSecure.post(`/admin/${res_id}/add-new-dishes/${branchID}`, data)
          .then(res => {
            toast.success('Dish Added Successfully')
            resetField("active")
            resetField("options")
            resetField("addOn")
            resetField("category")
            resetField("title")
            resetField("price")
            resetField("offerPrice")
            resetField("preparation_cost")
            resetField("sales_tax")
            resetField("supplementary_duty")
            resetField("img")
            setDescriptionContent("");
            navigate('/dish-list')
          })
          .catch(err => SwalErrorShow(err))
      })
      .catch(err => SwalErrorShow(err))
      .finally(()=>setLoading(false))


  };

  if (isLoading || loading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorPage />
  }


  return (
    <section className='max-w-7xl mx-auto py-12'>
      <ScrollToTop />
      <SectionTitle h1="Add A Dish" />
      <SetTitle title="Add Dish" />
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 justify-center items-start px-6 py-5 border border-gray-300 overflow-hidden bg-white rounded-md shadow-dashboard'>

        <div className="w-full  ">
          <div className=" h-full">


            {/* pp */}
            <p className="mt-3 mb-1.5 font-medium text-coolGray-800 text-base" data-config-id="auto-txt-10-3">
              Photo
            </p>
            <div className=''>

              {/* iamge 1  */}
              <div
                className=" flex items-center justify-center relative  h-60"

              >

                {!selectedImage0 &&
                  <>
                    <div className="w-full">
                      <div className="flex flex-wrap -m-3">
                        <div className="w-full p-3">

                          <div className="relative flex flex-col items-center justify-center mb-6 p-6 h-44 text-center text-green-500 focus-within:border-green-500 border border-dashed border-gray-300 rounded-lg">
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
                  <img src={selectedImage0} alt="Uploaded" className=" h-60 rounded-2xl object-contain" />
                )}
                <input

                  type="file"
                  accept="image/*"
                  className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                  onChange={handleImageUpload0}

                />
              </div>
            </div>
            {/* category  */}
            <div className="flex flex-wrap pb-3 m-3 border-1 rounded">
              <div className="w-full  p-3">
                <select
                  label="Select Dish Category"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"

                  defaultValue=""
                  {...register("category", {
                    required: "*category  is Required",
                  })}
                >
                  <option value="" disabled>
                    Select Dish Category
                  </option>

                  {data?.titles && Array.isArray(data?.titles) && data?.titles.map((item, _idx) => (
                    <option key={_idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {errors.category?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.category?.message}</p>)}

              </div>
              <div className="w-full  p-3">
                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Title</p>
                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="ie: Rice Bowl"
                  {...register("title", {
                    required: "*title  is Required",
                  })} />
                {errors.title?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.title?.message}</p>)}

              </div>
              {/* active  */}
              <div className="w-full mt-1 p-3">
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

              </div>
            </div>
            <div className="flex flex-wrap pb-3 m-3 border-1 rounded">
              {/* price */}
              <div className="w-full md:w-1/2 p-3 pb-0">
                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Regular Price</p>
                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="780"
                  {...register("price", {
                    required: "*price  is Required",
                    validate: {
                      isNumber: (value) => !isNaN(value)
                    },
                  })} />
                {errors.price?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.price?.message}</p>)}
                {errors.price?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}

              </div>
              <div className="w-full md:w-1/2 p-3">
                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Offer Price/Selling price</p>
                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="780"
                  {...register("offerPrice", {
                    required: "*offerPrice  is Required",
                    validate: {
                      isNumber: (value) => !isNaN(value)
                    },
                  })} />
                {errors.offerPrice?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.offerPrice?.message}</p>)}
                {errors.offerPrice?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
              </div>
              <div className="w-full p-3 pt-0">

                NB: Offer and regular price must be same if no offer are given
              </div>


              {/* preparation_cost */}
              <div className="w-full  p-3">
                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Preparation Cost</p>
                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="700"
                  {...register("preparation_cost", {
                    required: "*preparation_cost  is Required",
                    validate: {
                      isNumber: (value) => !isNaN(value)
                    },
                  })} />
                {errors.preparation_cost?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.preparation_cost?.message}</p>)}
                {errors.preparation_cost?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.preparation_cost?.message}</p>)}

              </div>
            </div>

            {/* tax  */}
            <div className="flex flex-wrap pb-3 m-3 border-1 rounded">
              {/* Sale Tax */}
              <div className="w-1/2  p-3 relative">
                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Sales Tax</p>
                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="30"
                  defaultValue={0}
                  {...register("sales_tax", {
                    required: "*sales_tax  is Required",
                    min: 0,
                    max: 100,
                    validate: validateSalesTax,
                  })} />
                <span className='absolute right-6 top-14'><MdOutlinePercent /></span>
                {errors.sales_tax?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.sales_tax?.message}</p>)}
                {errors.sales_tax?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*must be number 0-100</p>)}

              </div>

              {/* Suppelementary Duty  */}
              <div className="w-1/2  p-3 relative">
                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Suppelementary Duty  </p>
                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="30"
                  defaultValue={0}
                  {...register("supplementary_duty", {
                    required: "*supplementary_duty  is Required",
                    min: 0,
                    max: 100,
                    validate: validateSalesTax
                  })} />
                <span className='absolute right-6 top-14'><MdOutlinePercent /></span>
                {errors.supplementary_duty?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.supplementary_duty?.message}</p>)}
                {errors.supplementary_duty?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*must be number 0-100</p>)}
              </div>
            </div>


            <div className="flex flex-wrap pb-3 m-3 border-1 rounded">
              {/* description  */}
              <div className="w-full h-52 p-3">
                <div className="flex flex-wrap">
                  <div className="w-full ">
                    <p className="mb-1 text-sm text-gray-800 font-semibold" data-config-id="auto-txt-7-3">
                      Description
                    </p>

                    <Dish_Add_Description contents={descriptionContent} setContents={setDescriptionContent} setValue={setValue} valueName="description" />

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>



        <div className='w-full h-full p-3 select-none'>
          {/* --------------------------------------------------------------------------
          ------------------OPTIONS-----------------------------------------------------
          ------------------------------------------------------------------------------ */}
          <div className="flex flex-wrap pb-3 m-3 border-1 rounded p-2">
            <div className="p-6 h-full w-full   overflow-hidden bg-white  shadow-dashboard">
              <p className="mb-1.5 text-[18px] font-semibold text-gray-900 text-coolGray-800" data-config-id="auto-txt-21-3">Options</p>
              <small>if the dish has different and choices then you can create option&#40;ie: Pizza 10&#34; 16&#34;&#41;</small>
              {optionFields.map((branch, index) => (
                <div key={index} className="flex flex-wrap p-3 my-1 mb-3 border rounded relative">

                  {/* */}
                  <div className="w-full md:w-1/2 p-1">

                    <input
                      {...register(`options[${index}].name`, { required: 'name is required' })}
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder="Name"
                    />
                    {errors.options && errors.options[index]?.name && (
                      <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                        {errors.options[index].name.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 p-1">

                    <input
                      {...register(`options[${index}].priority`, { required: 'priority is reequired' })}
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="number"
                      placeholder="priority : 0 1 2 3"
                    />
                    {errors.options && errors.options[index]?.priority && (
                      <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                        {errors.options[index].priority.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 p-1">

                    <input

                      {...register(`options[${index}].price`, { required: 'price is required' })}
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="number"
                      placeholder="Extra Price"
                    />
                    {errors.options && errors.options[index]?.price && (
                      <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                        {errors.options[index].price.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 p-1">

                    <input

                      {...register(`options[${index}].preparation_cost`, { required: 'preparation cost required' })}
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder="Preparation cost"
                    />
                    {errors.options && errors.options[index]?.preparation_cost && (
                      <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                        {errors.options[index].preparation_cost.message}
                      </p>
                    )}
                  </div>





                  {/* Remove  Button */}
                  <div className='w-full flex flex-wrap justify-end items-center gap-2 absolute top-12'>
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
          {/* --------------------------------------------------------------------------
          ------------------Add Ons-----------------------------------------------------
          ------------------------------------------------------------------------------ */}
          <div className="flex flex-wrap pb-3 m-3 border-1 rounded p-2">
            <div className="p-6 h-full w-full   overflow-hidden bg-white  shadow-dashboard">
              <p className="mb-1.5 text-[18px] font-semibold text-gray-900 text-coolGray-800" data-config-id="auto-txt-21-3">Add Ons</p>
              <small>if you offer yoru customers to add additional items with this dish then you can create add ons option&#40;ie: spice , cheese&#41;</small>
              {addOnFields.map((item, index) => (
                <div key={index} className="flex flex-wrap p-3 my-1 mb-3 border rounded relative">

                  {/* */}
                  <div className="w-full  p-1">

                    <input
                      {...register(`addOn[${index}].name`, { required: 'name is required' })}
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder="Name"
                    />
                    {errors.addOn && errors.addOn[index]?.name && (
                      <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                        {errors.addOn[index].name.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 p-1">

                    <input

                      {...register(`addOn[${index}].price`, { required: 'price is required' })}
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="number"
                      placeholder="Price"
                    />
                    {errors.addOn && errors.addOn[index]?.price && (
                      <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                        {errors.addOn[index].price.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 p-1">

                    <input

                      {...register(`addOn[${index}].preparation_cost`, { required: 'preparation cost required' })}
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder="Preparation cost"
                    />
                    {errors.addOn && errors.addOn[index]?.preparation_cost && (
                      <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                        {errors.addOn[index].preparation_cost.message}
                      </p>
                    )}
                  </div>





                  {/* Remove  Button */}
                  <div className='w-full flex flex-wrap justify-end items-center gap-2 absolute top-12'>
                    <button
                      type="button"
                      onClick={() => addOnRemove(index)}
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
                  onClick={() => addOnAppend({})}
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

export default Dish_Add