import React, { useState } from 'react';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { Button } from '@nextui-org/react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import { ScaleLoader } from 'react-spinners';
import { SwalErrorShow } from '../../../../assets/scripts/Utility';

const PaymentType = () => {
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();

    const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm();


    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError, } = useQuery({
        queryKey: ['paymenttypes', res_id, branchID],
       
        queryFn: async () => {
            let res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/payments-type`);

            // let res = {
            //     data: {
            //         "paymentTypes": "PayLater",
            //         "takewayCharge": 0,
            //         "deliveryCharge": 50,
            //     }
            // }
            setValue('paymentTypes', res.data?.paymentTypes);
            setValue('takewayCharge', res.data?.takewayCharge);
            setValue('deliveryCharge', res.data?.deliveryCharge);
            return res?.data;
        },
    });

    const handleChange = (Changedata) => {

        

        

        Swal.fire({
            title: "Are you sure?",
            text: "It will change the business policy",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "info",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change"
        }).then((result) => {
            if (result.isConfirmed) {
                // axiosSecure.patch(`/restaurant/${res_id}/branch/${branchID}/payments-type`, reqData)
                //     .then(data => {
                //         toast.success("Successfully Changed");
                //         dataRefetch();
                //     })
                //     .catch((error) => {
                //         setValue('paymentType', data?.paymentTypes);
                //         Swal.fire({
                //             icon: 'error',
                //             title: error?.code + " " + error?.message,
                //             text: error.response.data?.message
                //         })




                //     })
                setValue('paymentTypes', Changedata);
            }
        });

    };

    const onSubmit = (formData) => {
        // Handle submission logic here, e.g., send data to the server
        console.log('Submitted Data:', formData);
        axiosSecure.patch(`/restaurant/${res_id}/branch/${branchID}/payments-type`,formData)
        .then(() => {
            toast.success('Data updated successfully!');
            dataRefetch();
        })
        .catch(err => { 
            SwalErrorShow(err);
            console.log(err);
        });
    };

    if (dataLoading) {
        return <ScaleLoader size={100} color='#36d7b7' style={{ margin: 'auto', "height": '50px' }} />;
    }

    if (dataError) {
        return <ErrorPage />;
    }

    return (
        <section>
            <SetTitle title="Payment" />
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-7xl mx-auto flex flex-col items-center pt-12 select-none '>
                <fieldset className="grid grid-cols-2 gap-4">
                    <legend className="sr-only">Payment type</legend>

                    <div>
                        <input
                            type="radio"
                            {...register("paymentTypes")}
                            id="PayFirst"
                            value="PayFirst"
                            className="peer hidden [&:checked_+_label_svg]:block"
                            onClick={() => handleChange("PayFirst")}
                        />
                        <label
                            htmlFor="PayFirst"
                            className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700">Pay First / Pre pay</p>
                            </div>
                            <p className="mt-1 text-xs text-gray-400">
                                For business that charge customer while ordering meal and it will Create a new order in case of adding a new meal <br /> <br />
                                {/* Pay First will use Foodie&#39;s own gateway */}
                            </p>
                        </label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            {...register("paymentTypes")}
                            id="PayLater"
                            value="PayLater"
                            className="peer hidden [&:checked_+_label_svg]:block"
                            onClick={() => handleChange("PayLater")}
                        />
                        <label
                            htmlFor="PayLater"
                            className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700">Pay Later / Post Pay </p>
                            </div>
                            <p className="mt-1 text-xs text-gray-400">
                                For business that charge customer after meal and it will Update previous order in case of adding extra meal <br /> <br />
                                {/* Payment system will be controlled by owner&#39;s own payment system */}
                            </p>
                        </label>
                    </div>
                </fieldset>

                <div className="w-full flex flex-wrap">
                    <div className="w-full md:w-1/2 p-3">
                        <p className="mb-1.5 font-medium text-base text-coolGray-800" data-config-id="auto-txt-3-3">Takeway Charge</p>
                        <input className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="number" placeholder="50"
                            {...register("takewayCharge", {
                                required: "*takeway charge is Required",
                            })}
                            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} />
                        {errors.takewayCharge?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.takewayCharge.message}</p>)}

                    </div>
                    <div className="w-full md:w-1/2 p-3">
                        <p className="mb-1.5 font-medium text-base text-coolGray-800" data-config-id="auto-txt-3-3">Delivery Charge (offsite)</p>
                        <input className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="number" placeholder="50"
                            {...register("deliveryCharge", {
                                required: "*Delivery charge is Required",
                            })}
                            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} />
                        {errors.deliveryCharge?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.deliveryCharge.message}</p>)}

                    </div>
                </div>
                <button type='submit' className="inline-block rounded bg-green-400 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-green-500">Update</button>
            </form>

            <label htmlFor="Currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Curency</label>
            <select id="Currency" disabled className="disabled:cursor-not-allowed block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option >Bangaldeshi taka- BDT (৳)</option>
            </select>
            <label htmlFor="TimeZone" className="block text-sm font-medium text-gray-900 dark:text-white">TimeZone</label>
            <select id="TimeZone" disabled className="disabled:cursor-not-allowed block w-full p-2 mb-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option >Asia/Dhaka UTC+06:00</option>
            </select>
            <p className='m-0 p-0 pl-1 text-xs text-gray-400'>Changing the timezone will cahnge the Business Hours and start and end times of your existing offer, Memberships and Vouchers</p>
        </section >
    );
};

export default PaymentType;