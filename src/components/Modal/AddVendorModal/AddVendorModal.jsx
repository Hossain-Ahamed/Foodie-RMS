import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa6";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { SwalErrorShow, validateMobileNumber } from "../../../assets/scripts/Utility";
import { FaPlus } from "react-icons/fa";
import useRestauarantAndBranch from "../../../Hooks/useRestauarantAndBranch";
const AddVendorModal = ({refetch}) => {
    const {res_id, branchID} = useRestauarantAndBranch()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleSubmit, register, setValue, formState: { errors }, resetField } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = (data) => {
        console.log(data)
        // edit request for package data
            axiosSecure.post(`/admin/${res_id}/branch/${branchID}/create-vendors`, data)
                .then(data => {
                    toast.success('Vendor Successfully Created');
                    refetch();
                    resetField("name")
                    resetField("phone")
                    resetField("address")
                    onOpenChange()
                })
                .catch(err => {
                    SwalErrorShow(err)
                })
    }
    return (
        <>
            <button className="bg-green-400 rounded-lg text-white p-2 flex items-center gap-1 text-lg font-medium justify-center" onClick={onOpen}> <FaPlus /> Add Vendors</button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Vendors</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="w-full p-1">
                                        <p className="mb-1.5 font-medium text-base text-coolGray-800" data-config-id="auto-txt-3-3">Name</p>
                                        <input className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="text"
                                            {...register("name", {
                                                required: "*Vendor name is Required",
                                            })} />
                                        {errors.name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.name.message}</p>)}

                                    </div>
                                    <div className="w-full p-1">
                                        <p className="mb-1.5 font-medium text-base text-coolGray-800" data-config-id="auto-txt-3-3">Contact</p>
                                        <input className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="number"
                                            {...register("phone", {
                                                required: "*Contact is Required",
                                                validate: {
                                                    notPhone: (value) => validateMobileNumber(value)
                                                },
                                            })}
                                            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} />
                                        {errors.phone?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.phone.message}</p>)}
                                        {errors.phone?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not a phone number</p>)}
                                    </div>
                                    <div className="w-full p-1">
                                        <p className="mb-1.5 font-medium text-base text-coolGray-800" data-config-id="auto-txt-3-3">Address</p>
                                        <input className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="text"
                                            {...register("address", {
                                                required: "*Address is Required",
                                            })} />
                                        {errors.address?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.address.message}</p>)}

                                    </div>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" color="success" variant="light">
                                            Create
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
};

export default AddVendorModal;