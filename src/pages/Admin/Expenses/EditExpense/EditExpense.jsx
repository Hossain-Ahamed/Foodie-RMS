import React, { useState } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import SetTitle from '../../../Shared/SetTtitle/SetTitle'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { SwalErrorShow, getAllExpenseType } from '../../../../assets/scripts/Utility'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch'
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage'
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import { useNavigate, useParams } from 'react-router-dom'

const EditExpense = () => {
    // state to catch the purchase if user select option other than purchase vendor will be disabled
    const [expenseCategory, SetExpenseCategory] = useState('');
    const [optionList, setOptionList] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { branchID, res_id } = useRestauarantAndBranch();
    const expenseType = getAllExpenseType();
    const { expenseID } = useParams();
    const navigate = useNavigate()
    const drowpdownCategory = ["Purchase", "Salaries"]
    const { refetch: dataRefetch, data: data = {}, isLoading, error: dataError } = useQuery({
        queryKey: ['categories', res_id, branchID],
        queryFn: async () => {
            let res = await axiosSecure.get(`/admin/${res_id}/branch/${branchID}/get-expenses/${expenseID}`)

            // return res.data.categories;
            // let res = {
            //     data: {

            //         active: true,
            //         category: "Rent",
            //         billDate: "2024-02-04",
            //         expense: "1000",
            //         payTo: "Mokles",
            //         payeeID: "939efx3",
            //         vendorDescription: "Hello Vai",
            //         img: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
            //         transactions: [
            //             {
            //                 paymentDate: "2024-02-03",
            //                 paymentAmount: "1000",
            //                 reference: "19ds32038sd82",
            //                 description: "Baki nai",
            //             },
            //             {
            //                 paymentDate: "2024-02-03",
            //                 paymentAmount: "1000",
            //                 reference: "19ds32038sd82",
            //                 description: "Baki nai",
            //             }
            //         ]

            //     }
            // }

            setValue("category", res?.data[0]?.category)
            setValue("billDate", res?.data[0]?.billDate)
            setValue("expense", res?.data[0]?.expense)
            setValue("payTo", res?.data[0]?.payTo)

            setValue("payeeID", res?.data[0]?.payeeID)
            setValue("vendorDescription", res?.data[0]?.vendorDescription)
            setValue("paymentDate", res?.data[0]?.paymentDate)
            setValue("paymentAmount", res?.data[0]?.paymentAmount)
            setValue("reference", res?.data[0]?.reference)
            setValue("description", res?.data[0]?.description)
            setValue("img", res?.data[0]?.img)
            return res?.data[0]
        }
    })

    const { register, handleSubmit, formState: { errors }, setValue, getValues, reset, control } = useForm({
        defaultValues: {
            active: true,
        },
    });

    const onSubmit = async (data) => {
        console.log(data);

        axiosSecure.patch(`/admin/${res_id}/branch/${branchID}/edit-expenses/${expenseID}`, data)
        .then(res => {
            toast.success('Expense Edited Successfully')
            navigate('/expenses')
        })
        .catch(err => SwalErrorShow(err))

    };

    if (isLoading) {
        return <LoadingPage />
    }

    if (dataError) {
        return <ErrorPage />
    }


    return (
        <section className='max-w-7xl mx-auto py-12'>
            <SectionTitle h1="Edit Expense" />
            <SetTitle title="Edit Expense" />
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 justify-center items-start px-6 py-5 border border-gray-300 overflow-hidden bg-white rounded-md shadow-dashboard'>

                <div className="w-full mt-3">
                    <div className=" h-full">
                        {/* category  */}
                        <div className="flex flex-wrap pb-3 m-3 border-1 rounded">
                            <div className="w-full p-3">
                            <label className="mb-1.5 font-medium text-base text-gray-800">
                                Bill Category
                            </label>
                                <select
                                    label="Select Dish Category"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"

                                    defaultValue=""
                                    {...register("category", {
                                        required: "*Category  is Required",
                                    })}
                                    onChange={event => {
                                        SetExpenseCategory(event.target.value);
                                        setValue('category', event.target.value);
                                        setValue('payTo', '');
                                        setValue('payeeID', '');
                                    }}
                                >
                                    <option value="" disabled>
                                        Select Expense Category
                                    </option>

                                    {expenseType.map((item, _idx) => (
                                        <option key={item?.title} value={item?.title}>
                                            {item?.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.category?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.category?.message}</p>)}
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
                                <label htmlFor="dob" className="mb-1.5 font-medium text-base text-gray-800">
                                    Bill Date
                                </label>
                                <input
                                    id="bill"
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="date"
                                    min="1800-01-01"
                                    max={new Date().toISOString().split('T')[0]}
                                    {...register('billDate', {
                                        required: '*Bill Date is required',

                                    })}
                                />
                                {errors.billDate && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.billDate.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Expenditure</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="1000"
                                    {...register("expense", {
                                        required: "*Expense amount is Required",
                                        validate: {
                                            isNumber: (value) => !isNaN(value)
                                        },
                                    })} />
                                {errors.expense?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.expense?.message}</p>)}
                                {errors.expense?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
                            </div>
                        </div>
                        <div className="flex flex-wrap pb-3 m-3 border-1 rounded">

                            {/* Pay to */}
                            {
                                drowpdownCategory.includes(expenseCategory)
                                    ?
                                    <div className="w-full md:w-1/2 p-3 pb-0">
                                        <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Pay To</p>
                                        <select
                                            label="Select Whom to Pay"
                                            className={`${(expenseCategory === "Purchase" || expenseCategory === "Salaries") || "cursor-not-allowed"} w-full bg-gray-50 border
                                     border-gray-300 text-gray-900 text-sm
                                      rounded-lg focus:ring-gray-500
                                       focus:border-gray-500 block p-2.5`}

                                            disabled={!(expenseCategory === "Purchase" || expenseCategory === "Salaries")}
                                            defaultValue=""
                                            // jdi expense type purchase or salary na hole disable thakbe
                                            {...register("payTo", {
                                            })}
                                            onChange={(e) => { optionList && Array.isArray(optionList) && setValue('payeeID', optionList.find(i => i?.name === e.target.value)?._id) }}
                                        >
                                            <option value="" disabled>
                                                Select Whom to Pay
                                            </option>

                                            {/* jdi expense type salary hoi tahole employee name ashbe drowpdown otherwise vendor der list ashbe */}
                                            {optionList && Array.isArray(optionList) && optionList.map((item, _idx) => (
                                                <option key={_idx} value={item?.name}>
                                                    {item?.name}
                                                </option>
                                            ))
                                            }
                                        </select>
                                        {(expenseCategory === "Purchase" || expenseCategory === "Salaries") && errors.payTo?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.payTo?.message}</p>)}
                                        {/* expense type jdi purchase or salary hoi tahole "whom to pay" dropdown select na korle error dibe */}
                                    </div>
                                    : <div className="w-full md:w-1/2 p-3">
                                        <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Pay To</p>
                                        <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="Alexa"
                                            {...register("payTo", {
                                                required: "*Pay To is Required"
                                            })} />
                                        {errors.payTo?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.payTo?.message}</p>)}
                                    </div>
                            }
                            {/* payee ID */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Payee ID</p>
                                <input className="disabled:cursor-not-allowed w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="0000"
                                    defaultValue={!drowpdownCategory.includes(expenseCategory) && 'N/A'}
                                    disabled={drowpdownCategory.includes(expenseCategory)}
                                    {...register("payeeID", {
                                        required: "*Payee ID is required"
                                    })} />
                                {errors.payeeID?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.payeeID?.message}</p>)}
                            </div>
                            <div className="w-full p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Description</p>
                                <textarea
                                    defaultValue="N/A"
                                    {...register('vendorDescription')}
                                    className="block w-full h-32 p-4 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input resize-none"
                                ></textarea>

                            </div>
                            <div className="flex flex-wrap pb-3 m-3 border-1 rounded p-2 select-none">
                                <div className="p-6 h-full w-full overflow-hidden bg-white shadow-dashboard">
                                    <p className="mb-1.5 text-[18px] font-semibold text-gray-900 text-coolGray-800" data-config-id="auto-txt-21-3">Previous Transaction</p>
                                    {
                                        data?.transactions && Array.isArray(data?.transactions) && data?.transactions?.map((payment, _idx) =>
                                            <div key={_idx} className="flex flex-wrap p-3 my-1 mb-3 border rounded relative">

                                                {/* */}
                                                <div className="w-full md:w-1/2 p-1">
                                                    <p className="mb-1.5 font-medium text-base text-gray-800">Payment Date</p>
                                                    <p
                                                        className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                                    >{payment?.paymentDate} </p>
                                                </div>
                                                <div className="w-full md:w-1/2 p-1">
                                                    <p className="mb-1.5 font-medium text-base text-gray-800">Payment Amount</p>
                                                    <p
                                                        className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                                    >{payment?.paymentAmount} </p>
                                                </div>
                                                <div className="w-full p-1">
                                                    <p className="mb-1.5 font-medium text-base text-gray-800">Reference ID/Transaction ID</p>
                                                    <p
                                                        className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                                    >{payment?.reference} </p>
                                                </div>
                                                <div className="w-full p-1">
                                                    <p
                                                        className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                                    >{payment?.description} </p>

                                                </div>

                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className='w-full h-full p-3 select-none'>
                    {/* --------------------------------------------------------------------------
                    ------------------Transaction-----------------------------------------------------
                    ------------------------------------------------------------------------------ */}
                    
                    <div className="flex flex-wrap pb-3 m-3 border-1 rounded p-2">
                        <div className="p-6 h-full w-full   overflow-hidden bg-white  shadow-dashboard">
                            <p className="mb-1.5 text-[18px] font-semibold text-gray-900 text-coolGray-800" data-config-id="auto-txt-21-3">New Transaction</p>
                            <small>You can make payments in segments or make full payment at once and find the detailed transaction here.</small>
                            <div className="flex flex-wrap p-3 my-1 mb-3 border rounded relative">

                                {/* */}
                                <div className="w-full md:w-1/2 p-1">
                                    <p className="mb-1.5 font-medium text-base text-gray-800">Payment Date</p>
                                    <input
                                        id="payment"
                                        className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                        type="date"
                                        min="1800-01-01"
                                        max={new Date().toISOString().split('T')[0]}
                                        {...register(`paymentDate`, {
                                            required: '*Payment Date is required',

                                        })}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 p-1">
                                    <p className="mb-1.5 font-medium text-base text-gray-800">Payment Amount</p>
                                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="ie: 1000"
                                        {...register(`paymentAmount`, {
                                            required: "*Payment Amount  is Required",
                                        })} />
                                   
                                </div>
                                <div className="w-full p-1">
                                    <p className="mb-1.5 font-medium text-base text-gray-800">Reference ID/Transaction ID</p>
                                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="*** *** ***"
                                        {...register(`reference`, {
                                            required: "*Ref/TransactionID is Required",
                                        })} />
                                    
                                </div>
                                <div className="w-full p-1">
                                    <textarea
                                        defaultValue="N/A"
                                        placeholder='Description'
                                        {...register(`description`, { required: "*Description is required" })}
                                        className="block w-full h-32 p-4 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input resize-none"

                                    ></textarea>
                                   
                                </div>

                            </div>
                        </div>
                    </div>

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

export default EditExpense