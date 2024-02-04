import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const MembershipRulesEdit = ({ data, handleChange }) => {
    const { control, handleSubmit, setValue } = useForm();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        setValue('singleTimeMinimumOrderAmount', data?.singleTimeMinimumOrderAmount || "");
        setValue('MinimumOrderAmountTillNow', data?.MinimumOrderAmountTillNow || "");
        setValue('percentageOffer', data?.percentageOffer || "");
        setValue('MaximumLimit_in_TK', data?.MaximumLimit_in_TK || "");
        setValue('rules', data?.rules || "");
    }, [data, setValue])



    const onSubmit = (formData) => {
        handleChange(formData)
    };

    return (
        <>
            <Button onPress={onOpen} color="success" className="text-white">Edit Rules</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-fit min-w-[580px] py-3">
                    {(onClose) => (
                        <>

                            <ModalBody >
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="w-full">

                                        <div className="w-full flex flex-wrap h-full   overflow-hidden bg-white">
                                            <div className="w-full  md:w-1/2 flex ">
                                                <div className="w-full p-3 relative">
                                                    <p className="mb-1.5 font-medium text-sm text-gray-800" data-config-id="auto-txt-3-3">
                                                        Min Order Amount <span className=' text-gray-500'>(Single Order)</span>
                                                    </p>
                                                    <Controller
                                                        name="singleTimeMinimumOrderAmount"
                                                        control={control}
                                                        defaultValue={data?.singleTimeMinimumOrderAmount || ""}
                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                className="w-full px-4 py-2.5 text-sm text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                                            />
                                                        )}
                                                    />
                                                    <p className='absolute right-7 top-[2.8rem] text-gray-500 text-xl'>৳</p>
                                                </div>
                                            </div>


                                            <div className="w-full  md:w-1/2 flex flex-wrap ">
                                                <div className="w-full  p-3 relative">
                                                    <p className="mb-1.5 font-medium text-sm text-gray-800" data-config-id="auto-txt-3-3">
                                                        Min Total Order Amount <span className='text-sm text-gray-500'>(Till Now)</span>
                                                    </p>
                                                    <Controller
                                                        name="MinimumOrderAmountTillNow"
                                                        control={control}
                                                        defaultValue={data?.MinimumOrderAmountTillNow || ""}
                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                className="w-full px-4 py-2.5 text-sm text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                                            />
                                                        )}
                                                    />
                                                    <p className='absolute right-7 top-[2.8rem] text-gray-500 text-xl'>৳</p>
                                                </div>
                                            </div>

                                            <div className="w-full  md:w-1/2  flex flex-wrap ">
                                                <div className="w-full  p-3 relative">
                                                    <p className="mb-1.5 font-medium text-sm text-gray-800" data-config-id="auto-txt-3-3">
                                                        Discount Percentage <span className='text-sm text-gray-500'>(in every Order)</span>
                                                    </p>
                                                    <Controller
                                                        name="percentageOffer"
                                                        control={control}
                                                        defaultValue={data?.percentageOffer || ""}
                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                className="w-full px-4 py-2.5 text-sm text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                                            />
                                                        )}
                                                    />
                                                    <p className='absolute right-7 top-[2.8rem] text-gray-500 text-xl'>%</p>
                                                </div>
                                            </div>

                                            <div className="w-full  md:w-1/2 flex flex-wrap ">
                                                <div className="w-full  p-3 relative">
                                                    <p className="mb-1.5 font-medium text-sm text-gray-800" data-config-id="auto-txt-3-3">
                                                        Max Discount Limit <span className='text-sm text-gray-500'>(Single Order)</span>
                                                    </p>
                                                    <Controller
                                                        name="MaximumLimit_in_TK"
                                                        control={control}
                                                        defaultValue={data?.MaximumLimit_in_TK || ""}
                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                className="w-full px-4 py-2.5 text-sm text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                                            />
                                                        )}
                                                    />
                                                    <p className='absolute right-7 top-[2.8rem] text-gray-500 text-xl'>৳</p>
                                                </div>
                                            </div>




                                            <div className="w-full   flex flex-wrap   px-4">
                                                <p className="mb-1.5 font-medium text-sm text-gray-800 " data-config-id="auto-txt-3-3">Conditions : </p>
                                                <div className="w-full relative py-2 revert-tailwind" >
                                                    <Controller
                                                        name="rules"
                                                        control={control}
                                                        defaultValue={data?.rules || ""}
                                                        render={({ field }) => (
                                                            <textarea
                                                                {...field}
                                                                className="w-full h-40 px-4 py-2.5 text-sm text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input resize-none"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                    <Button type='submit' color="success" variant="flat" onPress={onClose}>
                                        Update
                                    </Button>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
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

export default MembershipRulesEdit;
