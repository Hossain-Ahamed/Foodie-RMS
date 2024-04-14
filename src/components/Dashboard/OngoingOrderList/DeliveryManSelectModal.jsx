import React, { useState } from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import ErrorPage from '../../../pages/Shared/ErrorPage/ErrorPage';
import DeliveryManSelectModalForm from './DeliveryManSelectModalForm';

const DeliveryManSelectModal = ({ orderID,refetch }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <button onClick={onOpen} title="Handover to Delivery Boy" className="inline-flex ml-3 cursor-pointer text-gray-500"><TbTruckDelivery size={25} /></button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-0">
                                <DeliveryManSelectModalForm orderID={orderID} refetch={refetch} onOpenChange={onOpenChange}/>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeliveryManSelectModal;