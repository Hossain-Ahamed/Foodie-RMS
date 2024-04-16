import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Tooltip } from "react-tooltip";
import { MdPendingActions } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";
import PendingReservationModal from "../Modal/TableReservationModal/PendingReservationModal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRestauarantAndBranch from "../../Hooks/useRestauarantAndBranch";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { SwalErrorShow } from "../../assets/scripts/Utility";

export default function TableCard({ table, refetch }) {
    const axiosSecure = useAxiosSecure();
    const {res_id, branchID} = useRestauarantAndBranch()

    const handleDeleteReservation = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // for deleting table reservation
                axiosSecure.delete(`/admin/restaurant/${res_id}/branch/${branchID}/delete-reservation/${id}`)
                    .then(res => {
                        toast.success('Reservation canceled')
                        refetch();
                    })
                    .catch(err => SwalErrorShow(err))
            }
        });
        
    }
    return (
        // <Card className="py-4">
        //     <CardBody className="overflow-visible py-2">
        //         <Image
        //             alt="Card background"
        //             className="object-cover rounded-xl"
        //             src="/images/hero-card-complete.jpeg"
        //             width={270}
        //         />
        //     <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        //         <p className="text-tiny uppercase font-bold">Daily Mix</p>
        //         <small className="text-default-500">12 Tracks</small>
        //         <h4 className="font-bold text-large">Frontend Radio</h4>
        //     </CardHeader>
        //     </CardBody>
        // </Card>
        <div className="flex flex-wrap gap-3 items-center">
            <div
                className="relative max-w-80 flex flex-col items-center rounded-lg p-2 border-[1px] shadow-md"
            >
                {/* <svg aria-hidden="true" fill="none" height="80%" role="presentation" viewBox="0 0 24 24" width="80%"><path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="currentColor"></path><path d="M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z" fill="currentColor"></path></svg> */}
                <div className="">
                    {/* table img */}
                    <img className="rounded-lg" src={table?.img} alt="" />

                    <div className="mt-6 flex flex-wrap justify-around items-center gap-4 text-xs">
                        {/* user information */}
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 w-full">
                            {
                                table?.photoURL ? <img className="w-10 rounded-full" src={table?.photoURL} alt="" />
                                    : <FaUser size={40} className="border-[1px] p-2 rounded-full text-gray-500" />
                            }
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-small uppercase font-bold">{table?.user_name}</p>
                                <p className="text-sm uppercase font-medium text-gray-400">{table?.user_phone}</p>
                                <p className="text-small uppercase font-medium text-gray-400">{table?.date.split('T')[0]} {table?.timeSlot}</p>
                            </div>
                            <div className="mt-1.5 sm:mt-0">
                               
                               
                            </div>
                        </div>
                        {/* when the status is confirmed table number will be visiable */}
                        {
                            table?.status === "confirmed" && <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <svg
                                    className="w-4 h-4 text-gray-900"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.40524 15.5264L8.93524 20.0564C10.7952 21.9164 13.8152 21.9164 15.6852 20.0564L20.0752 15.6664C21.9352 13.8064 21.9352 10.7864 20.0752 8.91637L15.5352 4.39637C14.5852 3.44637 13.2752 2.93637 11.9352 3.00637L6.93524 3.24637C4.93524 3.33637 3.34524 4.92637 3.24524 6.91637L3.00524 11.9164C2.94524 13.2664 3.45524 14.5764 4.40524 15.5264Z"
                                        stroke="#292D32"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.73535 12.2264C11.1161 12.2264 12.2354 11.1071 12.2354 9.72638C12.2354 8.34567 11.1161 7.22638 9.73535 7.22638C8.35464 7.22638 7.23535 8.34567 7.23535 9.72638C7.23535 11.1071 8.35464 12.2264 9.73535 12.2264Z"
                                        stroke="#292D32"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M13.2354 17.2264L17.2354 13.2264"
                                        stroke="#292D32"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <div className="mt-1.5 sm:mt-0">
                                    <p className="text-gray-500">Table No</p>

                                    <p className="font-medium">{table?.table_number}</p>
                                </div>
                            </div> 
                        }

                        {/* <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <svg
                                    className="w-4 h-4 text-gray-900"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.9702 22C17.4931 22 21.9702 17.5228 21.9702 12C21.9702 6.47715 17.4931 2 11.9702 2C6.44737 2 1.97021 6.47715 1.97021 12C1.97021 17.5228 6.44737 22 11.9702 22Z"
                                        stroke="#292D32"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.20996 16C8.25996 17.51 10.02 18.5 12 18.5C13.98 18.5 15.73 17.51 16.79 16"
                                        stroke="#292D32"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <div className="mt-1.5 sm:mt-0">
                                    <p className="text-gray-500">Location</p>

                                    <p className="font-medium">{table?.location}</p>
                                </div>
                            </div> */}

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="w-4 h-4 text-gray-900"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                    stroke="#292D32"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                                    stroke="#292D32"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Table Capacity</p>

                                <p className="font-medium">{table?.numberOfPeople}</p>
                            </div>
                        </div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <HiOutlineStatusOnline className={`w-5 h-5 ${table?.status === "pending" ? "text-amber-500" : "text-emerald-500"}`} />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Status</p>

                                <p className={`font-medium ${table?.status === "pending" ? "text-amber-500" : "text-emerald-500"}`}>{table?.status}</p>
                            </div>
                        </div>
                    </div>

                    <div className=" absolute top-0 right-5 flex flex-col gap-5 border-t pt-4">
                        {/* when the status is pending then the pending icon will show */}
                        {
                            table && table?.status === "pending" && <PendingReservationModal refetch={refetch} table={table}/>
                        }
                        <div className="inline-flex self-center items-center">
                            <button
                                data-tooltip-id="cancel-button"
                                data-tooltip-content="Cancel Reservaton"
                                onClick={() => handleDeleteReservation(table?._id)}
                                className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-red-50 rounded-lg hover:bg-red-100 focus:ring-4 focus:outline-none  focus:ring-red-50 "
                                type="button"
                            >
                                <svg
                                    className="w-4 h-4 text-red-500 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15.2099 21.9999H8.7899C5.9999 21.9999 5.9099 20.7799 5.7999 19.2099L5.1499 9.13989"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18.8502 9.13989L18.2002 19.2099"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.3301 16.5H13.6601"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12.8198 12.5H14.4998"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.5 12.5H10.33"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <Tooltip id="cancel-button" />
                        </div>
                        {/* <div className="inline-flex self-center items-center">
                            <button
                                data-tooltip-id="approve-button"
                                data-tooltip-content="Approve"
                                // onClick={() => onDeleteTable(table?.number)}
                                className="inline-flex self-center items-center p-2 text-sm font-medium text-center  text-gray-900 bg-green-50 rounded-lg hover:bg-green-100 focus:ring-4 focus:outline-none  focus:ring-red-50 "
                                type="button"
                            >
                                <svg className="w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.0003 18.5L18.2777 17.1138C18.4244 16.3806 18.8164 15.7048 18.9562 14.9703C18.9852 14.818 19.0003 14.6608 19.0003 14.5C19.0003 13.1193 17.881 12 16.5003 12C15.1196 12 14.0003 13.1193 14.0003 14.5C14.0003 14.6608 14.0155 14.818 14.0445 14.9703C14.1843 15.7048 14.5763 16.3806 14.723 17.1138L15.0003 18.5M18.0003 18.5H15.0003M18.0003 18.5L20.4966 19.1659C21.375 19.3611 22 20.1402 22 21.0401C22 21.5702 21.5702 22 21.0401 22H20.4966H12.5H11.9599C11.4298 22 11 21.5702 11 21.0401C11 20.1402 11.625 19.3611 12.5034 19.1659L15.0003 18.5" stroke="#22c55e" strokeWidth="1.5" />
                                    <path d="M17 9V8C17 5.17157 17 3.75736 16.1213 2.87868C15.2426 2 13.8284 2 11 2H8C5.17157 2 3.75736 2 2.87868 2.87868C2 3.75736 2 5.17157 2 8V16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M7 8.66667C7 8.66667 7.625 8.66667 8.25 10C8.25 10 10.2353 6.66667 12 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 14H10" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M6 17H10" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>

                            </button>
                            <Tooltip id="approve-button" />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
