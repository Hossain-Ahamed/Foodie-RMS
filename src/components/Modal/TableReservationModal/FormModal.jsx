import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import useAuthProvider from "../../../Hooks/useAuthProvider";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { SwalErrorShow } from "../../../assets/scripts/Utility";
import useRestauarantAndBranch from "../../../Hooks/useRestauarantAndBranch";
// this the form for table reservation
const FormModal = () => {
    const {res_id, branchID} = useRestauarantAndBranch();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField, control } = useForm({
        defaultValues: {

        },
    });
    const [loading, setLoading] = useState(false)
    const axiosSecure = useAxiosSecure();
    const onSubmit = (data) => {
        setLoading(true)
        data.status = "confirmed"
        console.log(data);
        axiosSecure.post(`/restaurant/${res_id}/branch/${branchID}/admin-table-reservation`, data)
            .then(res => {
                toast.success("Table Reserved")
                onOpenChange()
            })
            .catch(err => SwalErrorShow(err))
            .finally(() => setLoading(false))
    }
    // if (!user?.email) {
    //     return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    // }
    // if (profileLoading) {
    //     return <></>
    // }
    // if (profileError) {
    //     return <ErrorPage />
    // }
    // if (!profile?.email || !profile?.phone || !profile?.name) {
    //     return <Navigate to='/edit-profile' state={{ from: location }} replace></Navigate>
    // }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* user name */}
                <div className="w-full p-3">
                    <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">User Name</p>
                    <input className=" w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="john doe"
                        {...register("user_name", {
                            required: "*User Name is Required",
                        })} />
                    {errors.user_name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.user_name?.message}</p>)}
                </div>
                {/* user phone number */}
                <div className="w-full p-3">
                    <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Phone</p>
                    <input className=" w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="+88"
                        {...register("user_phone", {
                            required: "*Phone number is Required",
                        })} />
                    {errors.user_phone?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.user_phone?.message}</p>)}
                    {errors.user_phone?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
                </div>
                {/* time selection field */}
                <div className="flex items-center">
                    <div className="w-full p-3">
                        <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Time</p>
                        <input defaultValue="16:00" className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="time"
                            {...register("timeSlot", {
                                required: "*Time is Required",

                            })} />
                        {errors.timeSlot?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.timeSlot?.message}</p>)}
                    </div>
                    {/* date selection field */}
                    <div className="w-full p-3">
                        <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Date</p>
                        <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="date"
                            {...register("date", {
                                required: "*Time is Required",

                            })} />
                        {errors.date?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.date?.message}</p>)}
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-full p-3">
                        <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Number Of People</p>
                        <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="3"
                            {...register("numberOfPeople", {
                                required: "*Number of people is Required",
                            })} />
                        {errors.numberOfPeople?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.numberOfPeople?.message}</p>)}
                    </div>
                    <div className="w-full p-3">
                        <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Table Number</p>
                        <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="2"
                            {...register("table_number", {
                                required: "*Table number is Required",
                            })} />
                        {errors.table_number?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.table_number?.message}</p>)}
                    </div>
                </div>
                <ModalFooter>

                    <Button isLoading={loading} type="submit" color="success" variant="solid" className="text-lg text-white w-full">
                        Reserve Table
                    </Button>
                </ModalFooter>
            </form>
        </div>
    );
};

export default FormModal;