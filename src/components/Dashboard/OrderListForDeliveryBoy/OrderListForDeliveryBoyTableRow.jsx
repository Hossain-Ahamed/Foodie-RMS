import { MdOutlineCheckCircle, MdClear, MdPendingActions, MdCheck } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import { TbMoneybag } from "react-icons/tb";
import Swal from "sweetalert2";
import { GiCampCookingPot } from "react-icons/gi";

import userImg from '../../../assets/images/Gif/lazy.jpg'
import noUserImage from '../../../assets/images/Gif/noUserImage.jpeg'
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { SwalErrorShow } from "../../../assets/scripts/Utility";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import OrderDetailAdmin from "../OngoingOrderList/OrderDetailAdmin";
import { CiDeliveryTruck } from "react-icons/ci";
import DeliveryBoyDetailView from "./DeliveryBoyDetailView";
import DeliveryBoyOTP_And_ReadyToDeliveryButtons from "./DeliveryBoyOTP_And_ReadyToDeliveryButtons";

const statusColorMap = {
    active: "success",


    vacation: "secondary",
    leave: 'secondary',
    probation: 'secondary',
    training: 'secondary',

    trial: 'primary',
    upgrading: 'primary',



    suspension: 'danger',
    terminated: 'danger',
    renewalPending: 'danger',
    paymentExpired: 'danger',




    hold: "warning",
    paused: "warning",
    downgrading: 'warning',
    paymentIssue: 'warning',
    paymentPending: 'warning',
    gracePeriod: 'warning',


};

const OrderListForDeliveryBoyTableRow = ({ order, PaymentType, refetch }) => {

    let statusStyle, paymentStatus, icon;
    switch (order.status) {
        case 'Pending':
            statusStyle = 'bg-amber-100 text-amber-700'
            icon = <MdPendingActions className="-ms-1 me-1.5 h-4 w-4" />
            break
        case "Payment Pending":
            statusStyle = 'bg-amber-100 text-amber-700'
            icon = <MdPendingActions className="-ms-1 me-1.5 h-4 w-4" />
            break
        case "Ready To Delivery":
            statusStyle = 'bg-amber-100 text-amber-700'
            icon = <MdPendingActions className="-ms-1 me-1.5 h-4 w-4" />
            break
        case 'Confirmed':
            statusStyle = 'bg-emerald-100 text-emerald-700'
            icon = <MdOutlineCheckCircle className="-ms-1 me-1.5 h-4 w-4" />
            break
        case 'Completed':
            statusStyle = 'bg-emerald-100 text-emerald-700'
            icon = <MdOutlineCheckCircle className="-ms-1 me-1.5 h-4 w-4" />
            break
        case 'Delivered':
            statusStyle = 'bg-emerald-100 text-emerald-700'
            icon = <MdOutlineCheckCircle className="-ms-1 me-1.5 h-4 w-4" />
            break
        case 'Cancelled':
            statusStyle = 'bg-red-100 text-red-700'
            icon = <MdClear className="-ms-1 me-1.5 h-4 w-4" />
            break
        default:
            statusStyle = 'bg-amber-100 text-amber-700'
            icon = <MdPendingActions className="-ms-1 me-1.5 h-4 w-4" />
            break
    }
    switch (order.cash_status) {
        case 'Not Paid':
            paymentStatus = 'bg-blue-100 text-blue-700'
            break
        case 'Paid':
            paymentStatus = 'bg-emerald-100 text-emerald-700'
            break
        case 'Refunded':
            paymentStatus = 'bg-amber-100 text-amber-700'

            break
        case 'Not Refunded':
            paymentStatus = 'bg-purple-100 text-purple-700'

            break
    }




    const axiosSecure = useAxiosSecure();


    const handleApproveToCook = () => {

        axiosSecure.patch(`/approve-to-cook/${order?._id}`, { data: Date.now() })
            .then((res => {
                toast.success("Updated");
                refetch();
            }))
            .catch(e => {
                SwalErrorShow(e)
            })


    }
    const handleApproveToDelivery = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are confirming dishes are ready to serve",

            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Procceed"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/approve-to-ready-to-serve/${order?._id}`, { data: Date.now() })
                    .then((res => {
                        toast.success("Updated");
                        refetch();
                    }))
                    .catch(e => {
                        SwalErrorShow(e)
                    })

            }
        });
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex items-center'>
                        <div className='flex items-center gap-5 flex-col md:flex-row'>
                            <div className=''>
                                <img
                                    alt='profile'
                                    src={order?.user_id ?
                                        order?.user_id?.imgURL || noUserImage
                                        : userImg}
                                    className='mx-auto object-cover rounded h-10 w-10 '
                                />
                            </div>
                            <div>
                                <span className='text-gray-900 whitespace-no-wrap block'>{order?.user_id?.name || "Anonymous"}</span>
                                <span className='text-gray-900 whitespace-no-wrap block'>{order?.phone}</span>
                            </div>
                        </div>
                        <div className='ml-3'>
                            {/* <p className='text-gray-900 whitespace-no-wrap'>{order?.orderID}</p> */}
                        </div>
                    </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                    <p className='text-green-400 whitespace-no-wrap font-semibold'>
                        #{order?._id.slice(-7)}
                        <span className="pl-1 text-blue-500 font-semibold">Token : {order?.token}</span>
                    </p>
                    <p className='text-gray-900 whitespace-no-wrap'>{order?.order_from} -{order?.orderNote}- {
                        order?.order_from === "OFFSITE" ?
                            <span className='text-amber-600 whitespace-no-wrap'>{order?.address?.streetAddress}</span>
                            :
                            <span className='text-amber-600 whitespace-no-wrap'>Table : {order?.table}</span>
                    }
                    </p>
                    <p className='text-sm'>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", }).format(new Date(order?.createdAt))} {new Date(order?.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</p>


                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                    <span
                        className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 ${statusStyle}`}
                    >
                        {
                            icon
                        }

                        <p className="whitespace-nowrap text-sm text-center">{order?.status}</p>
                    </span>

                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                    <span className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${paymentStatus}`}><p className="whitespace-nowrap text-sm text-center">{order?.cash_status}</p></span>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>


                    <button onClick={onOpen} title="View Details" className="inline-flex ml-3 cursor-pointer text-blue-500"><LuEye size={25} /></button>


                    <DeliveryBoyOTP_And_ReadyToDeliveryButtons order={order} refetch={refetch} />



                </td>
            </tr>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto" className='h-fit max-h-[85vh]  overflow-scroll pt-0 mx-0 px-0 scrollbar-hide'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-0">
                                <DeliveryBoyDetailView order={order} />
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default OrderListForDeliveryBoyTableRow