import { Button, User } from '@nextui-org/react';
import React, { useState } from 'react';
import { EyeIcon } from './EyeIcon';
import { GiTakeMyMoney } from "react-icons/gi";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { SwalErrorShow } from '../../../assets/scripts/Utility';
import TransactionHistoryView from './TransactionHistoryView';

const RestaurantTransactionsHistoryTableRow = ({ item, refetch }) => {
 

    return (
        <>
            <tr

                className={`bg-white border-b text-gray-600 hover:bg-gray-50 cursor-pointer`}>




                <td className="px-2 py-4  text-xs" >

                    <User
                        avatarProps={{ radius: "lg", src: item?.res_id?.img }}
                        description={item?.branchID?.branch_name}
                        name={item?.res_id?.res_name}
                        classNames=' object-contain '
                    >
                        {item?.branchID?.branch_name}
                    </User>


                </td>
                <td className="px-1 py-4 text-center text-xs" >
                    <p>{item?.month} {item?.year}</p>
                </td>
                <td className="px-1 py-4 text-center text-xs" >
                    <p>{item?.NeedToPay}</p>
                </td>
                <td className="px-1 py-4 text-center text-xs" >
                    <p>{item?.paid}</p>
                </td>
                <td className="px-1 py-4 text-center text-xs" >
                    <p>{(item?.NeedToPay - item?.paid).toFixed(2) || 0}</p>
                </td>
                <td className="px-1 py-4 text-center text-xs flex justify-start items-start" >
                    <TransactionHistoryView item={item}/>
                </td>



            </tr>
            
        </>
    );
};

export default RestaurantTransactionsHistoryTableRow;