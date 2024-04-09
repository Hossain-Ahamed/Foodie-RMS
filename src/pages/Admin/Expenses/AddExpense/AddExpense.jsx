import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import SetTitle from '../../../Shared/SetTtitle/SetTitle'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllExpenseType } from '../../../../assets/scripts/Utility'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch'
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage'
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';

const AddExpense = () => {
    // state to catch the purchase if user select option other than purchase vendor will be disabled
    const [expenseCategory, SetExpenseCategory] = useState('');
    const [optionList, setOptionList] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { branchID, res_id } = useRestauarantAndBranch();
    const expenseType = getAllExpenseType();
    const drowpdownCategory = ["Purchase", "Salaries"]
    const { refetch: dataRefetch, data: data = {}, isLoading, error: dataError } = useQuery({
        queryKey: ['expense', res_id, branchID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/restaurant/${res_id}/branch/${branchID}/get-expenses?expenseCategory={expenseCategory}`)
            // console.log(res.data.employeeNames)
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

    useEffect(() => {
        // setOptionList([])
        if (expenseCategory === "Purchase") {
            if (data?.vendorNames && Array.isArray(data?.vendorNames)) {

                setOptionList(data?.vendorNames)
            }
        } else if (expenseCategory === "Salaries") {
            if (data?.employeeNames && Array.isArray(data?.employeeNames)) {

                setOptionList(data?.employeeNames)
            }
        }
    }, [expenseCategory, setOptionList, data])

    const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField, control } = useForm({
        defaultValues: {

        },
    });

    // const { fields: optionFields, append: optionAppend, remove: optionRemove, } = useFieldArray({
    //     control,
    //     name: 'transactions',
    // });
    // const { fields: addOnFields, append: addOnAppend, remove: addOnRemove, } = useFieldArray({
    //     control,
    //     name: 'addOn',
    // });


    const [descriptionContent, setDescriptionContent] = useState("");

    // const [selectedImage0, setSelectedImage0] = useState(null);

    // const handleImageUpload0 = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedImage0(URL.createObjectURL(file));
    //     setValue("img", file);

    // };

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        data.branchID = branchID;
        data.res_id = res_id
        console.log(data);
        axiosSecure.post('/admin/create/expense', data)
            .then(data => {
                toast.success("Expense added successfully!")
                resetField("billDate");
                resetField("category");
                resetField("description");
                resetField("expense");
                resetField("payTo");
                resetField("payeeID");
                resetField("paymentAmount");
                resetField("paymentDate");
                resetField("reference");
                resetField("vendorDescription");
                // navigate('/expenses')
            })
            .catch(err => {
                toast.error("Something went wrong")
            })

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
        <section className='max-w-7xl mx-auto py-12'>
            <SectionTitle h1="Add Expense" />
            <SetTitle title="Add Expense" />
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 justify-center items-start px-6 py-5 border border-gray-300 overflow-hidden bg-white rounded-md shadow-dashboard'>

                <div className="w-full  ">
                    <div className=" h-full">
                        {/* category  */}
                        <div className="flex flex-wrap pb-3 m-3 border-1 rounded">
                            <div className="w-full p-3">
                                <select
                                    label="Select Expense Category"
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
                                            onChange={(e) => { optionList && Array.isArray(optionList) && setValue('payeeID', optionList.find(i => i?.name === e.target.value)?.id) }}
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
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">{expenseCategory === "Purchase" ? "Purchase" : "Description"}</p>
                                <textarea
                                    defaultValue="N/A"
                                    {...register('vendorDescription')}
                                    className="block w-full h-32 p-4 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input resize-none"
                                ></textarea>
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
                            <p className="mb-1.5 text-[18px] font-semibold text-gray-900 text-coolGray-800" data-config-id="auto-txt-21-3">Transaction</p>
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
                                    {errors.paymentDate && (
                                        <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                            {errors.paymentDate.message}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full md:w-1/2 p-1">
                                    <p className="mb-1.5 font-medium text-base text-gray-800">Payment Amount</p>
                                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="ie: 1000"
                                        {...register(`paymentAmount`, {
                                            required: "*Payment Amount  is Required",
                                        })} />
                                    {errors.paymentAmount?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.paymentAmount?.message}</p>)}
                                </div>
                                <div className="w-full p-1">
                                    <p className="mb-1.5 font-medium text-base text-gray-800">Reference ID/Transaction ID</p>
                                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="*** *** ***"
                                        {...register(`reference`, {
                                            required: "*Ref/TransactionID is Required",
                                        })} />
                                    {errors.reference?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.reference?.message}</p>)}
                                </div>
                                <div className="w-full p-1">
                                    <textarea
                                        defaultValue="N/A"
                                        placeholder='Description'
                                        {...register(`description`, { required: "*Description is required" })}
                                        className="block w-full h-32 p-4 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input resize-none"

                                    ></textarea>
                                    {errors.description?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.description?.message}</p>)}
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* -------------------------------------------------------------------------------------------- */}
                    <div className='flex flex-wrap justify-center items-end gap-3 p-1'>
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

export default AddExpense