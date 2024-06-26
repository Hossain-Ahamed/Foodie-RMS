import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from 'react-icons/io5';
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { SwalErrorShow, imageUpload } from "../../../assets/scripts/Utility";
import useRestauarantAndBranch from "../../../Hooks/useRestauarantAndBranch";

const AddStoryModal = ({ refetch }) => {
    const { res_id, branchID } = useRestauarantAndBranch()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleSubmit, register, setValue, formState: { errors }, resetField } = useForm();
    const axiosSecure = useAxiosSecure();
    const [selectedImage0, setSelectedImage0] = useState(null);

    const [upload,setUpload] = useState(false);
    const handleImageUpload0 = (event) => {
        const file = event.target.files[0];
        setSelectedImage0(URL.createObjectURL(file));
        setValue("img", file);

    };
    const onSubmit = (data) => {
        console.log(data)
        if (!data.img) {
            return toast.error("Image is not selected")
        }
        setUpload(true)
        // imageBB story upload api
        imageUpload(data?.img)
            .then(res => {
                onOpenChange()
                data.img = res?.data?.display_url;
                // post request for create story
                axiosSecure.post(`/admin/restaurant/${res_id}/branch/${branchID}/create-stories`, data)
                    .then(data => {
                        toast.success('Story Successfully Created');
                        setSelectedImage0(null)
                        refetch();
                        setValue(null);
                    })
                    .catch(err => {
                        SwalErrorShow(err)
                    })
            })
            .catch(err => SwalErrorShow(err))
            .finally(()=>setUpload(false))
    }
    return (
        <>
            {/* <button className="bg-green-400 rounded-lg text-white p-2 flex items-center gap-1 text-lg font-medium justify-center" onClick={onOpen}> <FaPlus /> Add Vendors</button> */}
            <div>
                <button onClick={onOpen}
                    className='flex justify-center items-center gap-2 text-white font-medium  px-4 py-2 bg-green-400 rounded-md text-nowrap'>Create Story<IoAddOutline className='text-white' />
                </button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Story</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* image */}
                                    <div
                                        className=" flex items-center justify-center relative  h-60"

                                    >

                                        {!selectedImage0 &&
                                            <>
                                                <div className="w-full">
                                                    <div className="flex flex-wrap -m-3">
                                                        <div className="w-full p-3">

                                                            <div className="relative flex flex-col items-center justify-center mb-6 p-6 h-44 text-center text-green-500 focus-within:border-green-500 border border-dashed border-coolGray-200 rounded-lg">
                                                                <svg className="mb-1.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <svg className="mb-1.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-1-3">
                                                                        <path d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </svg>
                                                                <p className="mb-1 text-sm text-gray-800 font-medium">
                                                                    <span className="text-gray-500" data-config-id="auto-txt-11-3">Click to Upload a file</span>
                                                                    <span data-config-id="auto-txt-12-3">or drag and drop</span>
                                                                </p>
                                                                <p className="text-xs text-gray-500 font-medium" data-config-id="auto-txt-13-3">PNG, JPG, GIF or up to 10MB</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        }
                                        {selectedImage0 && (
                                            <img src={selectedImage0} alt="Uploaded" className=" h-60 rounded-2xl object-contain" />
                                        )}
                                        <input

                                            type="file"
                                            accept="image/*"
                                            className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                                            onChange={handleImageUpload0}

                                        />
                                    </div>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={() => { setSelectedImage0(null); onClose(); }}>
                                            Close
                                        </Button>
                                        <Button type="submit" color="success" variant="light" isLoading={upload}>
                                            Create Story
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

export default AddStoryModal;