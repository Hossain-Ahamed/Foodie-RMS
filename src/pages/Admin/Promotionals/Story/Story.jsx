import React from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import AddStoryModal from '../../../../components/Modal/AddStoryModal/AddStoryModal';
import Swal from 'sweetalert2';
import { SwalErrorShow } from '../../../../assets/scripts/Utility';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import ViewStoryModal from '../../../../components/Modal/ViewStoryModal/ViewStoryModal';
import toast from 'react-hot-toast';
const Story = () => {
    const axioseSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();
    const { refetch, data: data = [], isLoading, error } = useQuery({
        queryKey: ['story', branchID],
        queryFn: async () => {
            const res = await axioseSecure.get(`/admin/restaurant/${res_id}/branch/${branchID}/all-stories`);
            return res?.data;
            // return [
            //     {
            //         _id: "234783bfd",
            //         img: "https://plus.unsplash.com/premium_photo-1669312747277-b1acd3eb2f98?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://images.unsplash.com/photo-1711216818794-cd4f226dc88d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://images.unsplash.com/photo-1707344088547-3cf7cea5ca49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://images.unsplash.com/photo-1711926641543-a37d9a020571?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D",
            //     },
            // ]
        },

    });
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axioseSecure.delete(`/admin/restaurant/${res_id}/branch/${branchID}/delete-stories/${id}`)
                    .then((res) => {
                        toast.success("Story Deleted Successfully")
                        refetch();
                    })
                    .catch(err => SwalErrorShow(err))
            }
        }).catch(e => {
            SwalErrorShow(e);
        });
    }

    if (isLoading) {
        return <LoadingPage />
    }

    if (error) {
        return <ErrorPage />
    }
    return (
        <div>
            <div className='flex mb-5'>

                <div className='w-full flex-1'>
                    <SetTitle title="Story" />
                    <SectionTitle h1="Story" />

                </div>
                {/* Create Story Modal  */}
                <AddStoryModal refetch={refetch} />
            </div>
            <div className='flex justify-center flex-wrap gap-5'>
                {
                    data && Array.isArray(data) && data.map((story, _idx) =>
                        <div key={_idx} className='group max-w-sm'>
                            <div className='flex flex-col gap-2 w-full'>
                                <div
                                    className='w-full relative overflow-hidden rounded-xl'>
                                    {/* <img
                                        className='object-cover h-64 w-full group-hover:scale-110 transition'
                                        src={story.img}
                                        alt='story-img'
                                    /> */}
                                    <ViewStoryModal image={story.img} />
                                    <div
                                        className='absolute top-3 right-3'
                                    >
                                        <button onClick={() => handleDelete(story._id)} className=" cursor-pointer w-full flex items-center justify-center text-red-600 backdrop-blur-sm bg-white/35 rounded-full p-1.5" title='Delete' aria-label='Delete'>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18.8499 9.13989L18.1999 19.2099C18.0899 20.7799 17.9999 21.9999 15.2099 21.9999H8.7899C5.9999 21.9999 5.9099 20.7799 5.7999 19.2099L5.1499 9.13989" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10.3301 16.5H13.6601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Story;