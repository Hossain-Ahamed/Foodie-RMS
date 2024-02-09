import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import useRestauarantAndBranch from "../../../../../Hooks/useRestauarantAndBranch";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { IoIosAddCircleOutline } from "react-icons/io";

import LoadingPageWIthIconOnly from './../../../../Shared/LoadingPages/LoadingPageWIthIconOnly/LoadingPageWIthIconOnly';

export default function AddMember({ refetch: memberListRefetch, handleAddMember }) {
    const { res_id } = useRestauarantAndBranch();

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();



    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    /**
     * -----------------------------------------------------------------------------------
     *                              Searching Functions
     * 
     */

    const [SearchedResult, setSearchedResult] = useState([]);
    const [loadingOnSearch, setLoadingonSearch] = useState(false);
    const [SearchedValueReceived, setSearchedValueReceived] = useState(false);
    // trim and get the only data to search 
    function trimObjectFields(obj) {
        const trimmedObject = {};

        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (typeof value === 'string') {
                const trimmedValue = value.trim();
                if (trimmedValue !== '') {
                    trimmedObject[key] = trimmedValue;
                }
            } else {
                trimmedObject[key] = value;
            }
        });

        return trimmedObject;
    }


    // check if null submitted 
    function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const onSubmit = async (data) => {

        const trimmedData = trimObjectFields(data);


        if (isObjectEmpty(trimmedData)) {
            toast.error('No data inserted');
            return;
        }

        setSearchedResult([])
        setLoadingonSearch(true);
        setSearchedResult(false);

        // search from server 

        // Todo: uncomment this to fetch
        // await axiosSecure.post('/search-employee-to-add', trimmedData)
        //     .then(res => {
        //         setSearchedResult(res.data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         toast.error(error?.code + " " + error?.response?.data?.message)
        //     })
        //     .finally(() => {

        //         setLoadingonSearch(false);
        //         setSearchedValueReceived(true);
        //     })





        // --------------------------
        // Todo: delete this to fetch
        setSearchedResult([
            {
                _id: "1",
                displayName: "Farhan Hasan",

                email: "nilok@gmail.com",

                phoneNumber: "018399473783",


                uid: "4385884935",


                photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                amount: 450,
            },
            {
                _id: "2",
                displayName: "Fattan Prodan",

                email: "nilok@gmail.com",

                phoneNumber: "018399473783",


                uid: "4385884935",

                photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                amount: 450,
            },

            {
                _id: "6",
                displayName: "Gazi Fuad",

                email: "sodome@gmail.com",

                phoneNumber: "018399473783",

                uid: "4385884935",


                photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                amount: 450,

            },
        ]);




        setLoadingonSearch(false)
        setSearchedValueReceived(true);
        // ---------------------------------

    }
    /**
     * --------------------------------------------------------------------------------
     */



    return (
        <>
            <Button onPress={onOpen} color="success" className="text-white">Add Member</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-fit min-w-[580px]">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Member</ModalHeader>
                            <ModalBody >
                                <form onSubmit={handleSubmit(onSubmit)} className='select-none ' autoComplete='off'>
                                    <div className="px-3 pt-2 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                                        <div className="flex flex-wrap pt-3 pb-5 -m-3">

                                            {/* mobile  */}
                                            <div className="w-full px-3 pb-1">
                                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-6-3">mobile number</p>
                                                <input className="w-full px-4 py-1.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="01x xxx xxxx "
                                                    {...register("mobile")} />
                                                {errors.mobile?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.mobile.message}</p>)}
                                                {errors.mobile?.type === "notmobile" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not a mobile number</p>)}

                                            </div>





                                            <div className='w-full   h-full  px-4 flex justify-center items-center'>
                                                <button type='submit' className="w-full mt-5 relative flex flex-wrap justify-center   py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button ">
                                                    <p data-config-id="auto-txt-22-3">Search</p>

                                                    <span className='absolute right-3 top-2'>
                                                        <span className="sr-only">Search</span>

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-5 w-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                            />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>

                                        </div>


                                    </div>
                                </form>
                                {
                                    loadingOnSearch ?
                                        <div className="h-[300px]">
                                            <LoadingPageWIthIconOnly />
                                        </div>

                                        :
                                        <>
                                            {/* show search result here  */}
                                            <div className="w-full mt-3 ">
                                                <div className="px-6  h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                                                    <div className='py-2'>
                                                        <div className='-mx-4 py-2 overflow-x-auto'>
                                                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                                                {
                                                                    SearchedResult &&
                                                                    Array.isArray(SearchedResult) &&
                                                                    SearchedResult.length > 0 && <>
                                                                        <table className='min-w-full leading-normal'>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th
                                                                                        scope='col'
                                                                                        className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                                                                    >
                                                                                        Profile
                                                                                    </th>


                                                                                    <th
                                                                                        scope='col'
                                                                                        className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
                                                                                    >
                                                                                        Mobile
                                                                                    </th>
                                                                                    <th
                                                                                        scope='col'
                                                                                        className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
                                                                                    >
                                                                                        Order Amount
                                                                                    </th>


                                                                                    <th
                                                                                        scope='col'
                                                                                        className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                                                                    >
                                                                                        Add
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>{
                                                                                SearchedResult.map((item, _idx) => <tr key={_idx}>
                                                                                    <td className='px-2 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                                        <div className='flex items-center '>
                                                                                            <div className='flex items-center gap-5 flex-col md:flex-row'>
                                                                                                <div className=''>
                                                                                                    <img
                                                                                                        alt='profile'
                                                                                                        src={item?.photoURL}
                                                                                                        className='mx-auto object-cover rounded h-10 w-15 '
                                                                                                    />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <span className='text-gray-900 whitespace-no-wrap block'>{item?.displayName} </span>
                                                                                                    <span className='text-gray-900 whitespace-no-wrap block'>{item?.email}</span>
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                    </td>


                                                                                    <td className='px-2 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                                                                                        {item?.phoneNumber}
                                                                                    </td>

                                                                                    <td className='px-2 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                                                                                        {item?.amount} ৳
                                                                                    </td>




                                                                                    <td className='py-5 border-b border-gray-200 bg-white text-sm'>
                                                                                        <span
                                                                                            className='text-gray-900 whitespace-no-wrap flex flex-col md:flex-row gap-4 md:gap-0 items-center'
                                                                                        >
                                                                                            <button onClick={() => handleAddMember(item, reset, onOpenChange)} className="inline-flex ml-3 cursor-pointer text-gray-500 transition-colors duration-300 "> <IoIosAddCircleOutline className='w-5 h-5 text-green-400 hover:text-green-600' /></button>
                                                                                        </span>
                                                                                    </td>

                                                                                </tr>)}
                                                                            </tbody>
                                                                        </table>
                                                                    </>
                                                                }



                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }


                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
