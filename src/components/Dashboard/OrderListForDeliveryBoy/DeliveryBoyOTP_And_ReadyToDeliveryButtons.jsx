import React, { useState } from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import deliveredIcon from '../../../assets/images/icons/delivered.svg'
import { IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import OtpInput from 'react-otp-input';
import './style.css'
import SectionTitle from '../../SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { SwalErrorShow } from '../../../assets/scripts/Utility';
import toast from 'react-hot-toast';
const DeliveryBoyOTP_And_ReadyToDeliveryButtons = ({ order, refetch }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const axiosSecure = useAxiosSecure();

    const [Loading, setLoading] = useState(false);


    const [{ otp, numInputs, separator, minLength, maxLength, placeholder, inputType }, setConfig] = React.useState({
        otp: '',
        numInputs: 4,
        separator: '-',
        minLength: 0,
        maxLength: 40,
        placeholder: '',
        inputType: 'text',
    });

    const handleOTPChange = (otp) => {
        setConfig((prevConfig) => ({ ...prevConfig, otp }));
    };






    const handleProceedTOReadyToDelivery = () => {


        Swal.fire({
            title: "Are you sure?",
            text: "Confirmed you received the Food and you are on the way to Deliver Product",

            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Procceed"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/handle-proceed-to-ready-to-delivery/${order?._id}`, { data: Date.now() })
                    .then((res => {
                        refetch();
                        toast.success("Updated");
                    }))
                    .catch(e => {
                        SwalErrorShow(e)
                    })

            }
        });
    }








    const handleVerifyOTP = () => {

        setLoading(true);
        axiosSecure.patch(`/handle-proceed-to-delivered/${order?._id}`, { otp })
            .then((res => {
                refetch();
                toast.success("Successfully completed");
            }))
            .catch(e => {
                SwalErrorShow(e)
            })
            .finally(()=>{
                setLoading(false);
                setConfig({
                    otp: '',
                    numInputs: 4,
                    separator: '-',
                    minLength: 0,
                    maxLength: 40,
                    placeholder: '',
                    inputType: 'text',
                });
                onOpenChange();
            })


    };


    return (

        <>
            {
                order?.status === "Shipped" && <button onClick={handleProceedTOReadyToDelivery} title="Ready to Delivery" className="inline-flex ml-3 cursor-pointer text-gray-500"><CiDeliveryTruck size={25} /></button>
            }
            {
                order?.status === "Ready To Delivery" && <button onClick={onOpen} title="Order Delivered" className="inline-flex ml-3 cursor-pointer text-blue-500"> <IoCheckmarkDoneCircleOutline size={25} /> </button>
            }

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalBody>
                                <div >


                                    <SectionTitle h3="Enter Verification Code" />
                                    <div className=" select-none pl-6 pt-8">
                                        <OtpInput
                                            inputStyle="inputStyle"
                                            numInputs={4}
                                            onChange={handleOTPChange}
                                            renderSeparator={<span> - </span>}
                                            value={otp}
                                            placeholder={placeholder}
                                            inputType={inputType}
                                            renderInput={(props) => <input {...props} />}
                                            shouldAutoFocus
                                            className="select-none"
                                        />
                                    </div>
                                    <Button isLoading={Loading} onClick={handleVerifyOTP} className='mt-5 w-full text-white text-lg font-semibold' color='success' variant='solid'  >
                                        Verify
                                    </Button>

                                </div>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeliveryBoyOTP_And_ReadyToDeliveryButtons;