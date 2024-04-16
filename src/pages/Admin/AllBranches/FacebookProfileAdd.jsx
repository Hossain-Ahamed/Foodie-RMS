// TableManagement.js
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "react-query";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { IoAddOutline } from "react-icons/io5";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRestauarantAndBranch from "../../../Hooks/useRestauarantAndBranch";
import LoadingPage from "../../Shared/LoadingPages/LoadingPage/LoadingPage";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";
import toast from "react-hot-toast";
import { SwalErrorShow } from "../../../assets/scripts/Utility";
const FacebookProfileAdd = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setloading] = useState(false);
    const {
        handleSubmit,
        control,
        setValue,
        register,
        formState: { errors },
        reset,
    } = useForm();
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();

    // Fetch existing table data
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["facebook-data", res_id, branchID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/admin-facebook-data`);
            // console.log(res.data, 34);
            return res.data;

        },
    });



    // Function to handle form submission
    const onSubmit = (formData) => {
        // console.log(formData)
        setloading(true);
        axiosSecure.post(`/restaurant/${res_id}/branch/${branchID}/admin-facebook-data`, formData)
            .then(res => {
                toast.success("Successfully Updated");
                onOpenChange()
            }).catch(e => {
                console.error(e);
                SwalErrorShow(e);
            })
            .finally(() => {
                setloading(false)
            })
    };

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorPage />;
    }

    return (

        <>


            <button onClick={onOpen} disabled={loading}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_53_168)" />
                    <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_53_168" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#18ACFE" />
                            <stop offset="1" stopColor="#0163E0" />
                        </linearGradient>
                    </defs>
                </svg>

            </button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6 ", // Change to light gray background
                    backdrop: " backdrop-opacity-40",
                    base: "border-[#292f46] bg-white text-[#19172c] ",
                    header: "border-b-[1px] border-slate-200 ", // Change to light gray background
                    footer: "border-t-[1px] border-[#292f46] ", // Change to light gray background
                    closeButton:
                        "bg-red-50 hover:bg-red-100 text-red-300 active:bg-red-100 rounded-md",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalBody>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="w-full  p-3">
                                        <p
                                            className="mb-1.5 font-medium text-base text-gray-800"
                                            data-config-id="auto-txt-3-3"
                                        >
                                            APP ID
                                        </p>
                                        <input
                                            className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input"
                                            type="text"
                                            placeholder="2"
                                            defaultValue={data?.appID}
                                            {...register("appID", {
                                                required: "*APP ID  is Required",

                                            })}
                                        />


                                    </div>

                                    {/* capacity  */}
                                    <div className="w-full  p-3">
                                        <p
                                            className="mb-1.5 font-medium text-base text-gray-800"
                                            data-config-id="auto-txt-3-3"
                                        >
                                            Page ID
                                        </p>
                                        <input
                                            className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input"
                                            type="text"
                                            placeholder="84545298039534905"
                                            defaultValue={data?.pageID}
                                            {...register("pageID", {
                                                required: "*page ID  is Required",

                                            })}
                                        />

                                    </div>



                                    <Button color="success" type="submit" className="w-full">
                                        <span className="text-white">Save</span>
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>


    );
};

export default FacebookProfileAdd;
