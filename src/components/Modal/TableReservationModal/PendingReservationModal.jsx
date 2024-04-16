import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast'
import { MdPendingActions } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { FaUser } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { SwalErrorShow } from "../../../assets/scripts/Utility";
import useRestauarantAndBranch from "../../../Hooks/useRestauarantAndBranch";

export default function PendingReservationModal({table: user, refetch}) {
    // this component rendered in tablecard component
    const {res_id, branchID} = useRestauarantAndBranch()
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField, control } = useForm({
        defaultValues: {

        },
    });
    const onSubmit = (data) => {
        setLoading(true)
        console.log(data);
        axiosSecure.patch(`/admin/restaurant/${res_id}/branch/${branchID}/reserve-table/${user?._id}`, data)
            .then(res => {
                toast.success("Pending Reservation is Confirmed")
                onOpenChange();
                refetch()
            })
            .catch(err => SwalErrorShow(err))
            .finally(() => setLoading(false))
    }

    // const { user } = useAuthProvider();
    // const location = useLocation()
    // if(!user?.email){
    //     toast.error("Please Login")
    //     return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    // }
    return (
        <>
            {/* <Button variant="bordered" color="primary" onPress={onOpen} className="flex items-center gap-1">Reserve Table</Button> */}
            <div>
                <div className="inline-flex self-center items-center" onClick={onOpen}>
                    <button
                        data-tooltip-id="pending-button"
                        data-tooltip-content="Pending Reservation"
                        // onClick={() =>
                        //     downloadQRCode(
                        //         table?.qrCodeData + _idx + table?.number,
                        //         table?.number
                        //     )
                        // }
                        className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-amber-50 rounded-lg hover:bg-amber-100 focus:ring-4 focus:outline-none  focus:ring-gray-50 "
                        type="button"
                    >
                        <MdPendingActions className="w-4 h-4 text-amber-500" />
                    </button>
                    <Tooltip id="pending-button" />
                </div>
                {/* <button onClick={onOpen} className='flex justify-center items-center gap-2 text-white font-medium px-4 py-2 bg-green-400 rounded-md text-nowrap'>Create Reservation</button> */}
            </div>
            <Modal placement="auto" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className='h-fit max-h-[85vh] overflow-scroll pt-0 mx-0 px-0 scrollbar-hide'>
                                <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                                    <div className="space-y-1">
                                        {
                                            user?.photoURL ? <img className="w-40 mx-auto rounded-lg" src={user?.photoURL} alt="" />
                                                : <FaUser size={80} className="border-[1px] p-2 rounded-lg text-gray-500 mx-auto" />
                                        }
                                        <p className="text-medium uppercase font-bold text-center">{user?.user_name}</p>
                                        <p className="text-medium uppercase text-center text-gray-400">{user?.user_phone}</p>
                                        <p className={`text-small uppercase text-center text-gray-400`}>Reservation status: <span className={`${user?.status === "pending" ? "text-amber-500" : "text-emerald-500"}`}>{user?.status}</span></p>
                                    </div>
                                    <div className="w-full p-3">
                                        <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Assign table number</p>
                                        <input className=" w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="3"
                                            {...register("table_number", {
                                                required: "*Table number is Required",
                                            })} />
                                        {errors.table_number?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.table_number?.message}</p>)}
                                    </div>
                                    <ModalFooter>

                                        <Button isLoading={loading} type="submit" color="success" variant="solid" className="text-lg text-white w-full">
                                            Confirm Reserve Table
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
