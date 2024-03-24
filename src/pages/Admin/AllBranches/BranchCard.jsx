import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Swal from "sweetalert2";
const BranchCard = ({ data, setBranchAndRestaurantName }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSelect = () => {

        setBranchAndRestaurantName({
            res_id: data?.res_id,
            branchID: data?.branchID,
            res_img: data?.res_img,
            res_name: data?.res_name,
            branch_name: data?.branch_name,
            role: data?.role,
        })



    }

    const handleDeleteButton = () => {
        onOpenChange()
    }

    const handleDelete = ()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            cancelButtonColor: "blue",
            confirmButtonText: "Yes, Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    return (
        <>
            <div onClick={handleSelect} className="relative block rounded-lg p-4 border border-slate-300 shadow-sm shadow-indigo-100 ">
                <img
                    alt="img"
                    src={data?.res_img}
                    className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2">
                    <dl>
                        <div>
                            <dt className="sr-only">Restaurant name</dt>

                            <dd className="font-medium">{data?.res_name} <span className='text-[10px] text-gray-400' title={data?.res_id}>@{data?.res_id && data?.res_id.slice(-6)}</span></dd>
                        </div>
                        <div>

                            <dt className="sr-only">Branch name</dt>
                            <dd className="text-sm text-gray-500">{data?.branch_name} <span className='text-[10px] text-gray-400' title={data?.branchID}>@{data?.branchID && data?.branchID.slice(-6)}</span></dd>
                        </div>


                        <div className="w-full flex gap-2 mt-3  justify-around items-center border rounded-lg p-2 " title='View' aria-label='view'>
                            
                            <Link to={`/branch-detail/edit/${data?.branchID}`} className=" cursor-pointer w-full flex items-center justify-center text-blue-500" title='Edit' aria-label='Edit'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.0399 3.02001L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96001C22.3399 6.60001 22.9799 5.02001 20.9799 3.02001C18.9799 1.02001 17.3999 1.66001 16.0399 3.02001Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.9099 4.15002C15.5799 6.54002 17.4499 8.41002 19.8499 9.09002" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </Link>
                            <button onClick={handleDeleteButton} className=" cursor-pointer w-full flex items-center justify-center text-red-600" title='Delete' aria-label='Delete'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.8499 9.13989L18.1999 19.2099C18.0899 20.7799 17.9999 21.9999 15.2099 21.9999H8.7899C5.9999 21.9999 5.9099 20.7799 5.7999 19.2099L5.1499 9.13989" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.3301 16.5H13.6601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>


                            </button>
                        </div>

                    </dl>


                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-center gap-1 text-danger">Confirm  Deletion &#34;{data?.branch_name}&#34;</ModalHeader>
                            <ModalBody>
                                <div className="mb-4">
                                    <p className="flex items-start mb-2">
                                        <span className="mr-2">&#8226;</span>
                                        <span className="ml-1">Deleting a branch will remove all associated data, including menus, staff information, and sales records.</span>
                                    </p>
                                    <p className="flex items-start mb-2">
                                        <span className="mr-2">&#8226;</span>
                                        <span className="ml-1">This action is irreversible and permanently erases the branch information.</span>
                                    </p>
                                    <p className="flex items-start mb-2">
                                        <span className="mr-2">&#8226;</span>
                                        <span className="ml-1">It may affect ongoing operations and historical analysis related to the branch.</span>
                                    </p>
                                    <p className="flex items-start mb-2">
                                        <span className="mr-2">&#8226;</span>
                                        <span className="ml-1">Consider exporting or backing up any important data before proceeding.</span>
                                    </p>

                                    <p className="flex items-start mb-2">
                                        <span className="mr-2">&#8226;</span>
                                        <span className="ml-1">Ensure to communicate this decision with relevant stakeholders.</span>
                                    </p>
                                </div>
                            </ModalBody>





                            <ModalFooter>
                             
                                <Button color="danger" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default BranchCard;