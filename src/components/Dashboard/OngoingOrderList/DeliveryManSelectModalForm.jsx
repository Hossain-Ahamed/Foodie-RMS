import React, { useState } from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import ErrorPage from '../../../pages/Shared/ErrorPage/ErrorPage';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const DeliveryManSelectModalForm = ({ orderID, refetch, onOpenChange }) => {

    const [selected, setSelected] = useState({});
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID, role } = useRestauarantAndBranch();
    const [saveOnLoading, setSaveOnLoading] = useState(false);

    const { refetch: deliveryBoyRefetch, data, isLoading, error } = useQuery({
        queryKey: ['delivery-man-list', res_id, branchID, orderID],
        queryFn: async () => {


            // console.log(`/restaurant/${res_id}/branch/${branchID}/delivery-man-list`)
            const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/delivery-man-list`);
            // console.log(res.data)
            return res.data;
        },

    });


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        // console.log(data)
        setSaveOnLoading(true);

        const uploadData = {
            orderID : orderID,
            _id: data?.deliveryPartner,
            message: `Delivery Boy : ${selected?.f_name || ""} ${selected?.l_name || ""} \nPhone: ${selected?.mobile || ""} `
        }
        console.log(uploadData)
        axiosSecure.patch(`/restaurant/${res_id}/branch/${branchID}/assign-delivery-boy`, uploadData)
            .then((data) => {

                refetch();
                toast.success("Successful!");
                onOpenChange();

            })
            .catch((e) => {
                console.log(e);
                toast.error(`${e?.response?.status} ${e?.code}`)

            }).finally(() => { setSaveOnLoading(false) })
    };


    if (isLoading) {
        return <></>
    }
    if (error) {
        return <ErrorPage />
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" border rounded-md  p-2"
        >

            <div className=" py-3">
                <label className="label">
                    <span className="label-text">Delivery Partner</span>
                </label>
                <select

                    className="  rounded-md py-1.5 border w-full "
                    {...register("deliveryPartner", { required: true })}
                    defaultValue=""
                    onChange={(e) => { setSelected(data.find(i => i?._id === e.target.value)) }}

                >
                    <option disabled value=""> Select One </option>
                    {
                        data && Array.isArray(data) && data.map(item => (
                            <option key={item?._id}
                                value={item?._id}>
                                {item?.f_name} {item?.l_name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-6" >
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Message
                </label>
                <textarea
                    id="message"
                    readOnly
                    value={`Delivery Boy : ${selected?.f_name || ""} ${selected?.l_name || ""} \nPhone: ${selected?.mobile || ""} `}
                    {...register("message", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none h-20"
                />
            </div>


            <div className="w-full flex justify-between items-center">
                <button
                    type="submit" disabled={saveOnLoading}
                    className="w-full text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                    Proceed To &#34;Shipped&#34;
                </button>

            </div>
        </form>
    );
};


export default DeliveryManSelectModalForm;