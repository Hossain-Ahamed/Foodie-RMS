import React from 'react';
import SetTitle from '../../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../../components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import AddMember from './AddMember';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../../Hooks/useRestauarantAndBranch';
import { useMutation, useQuery } from 'react-query';
import LoadingPage from '../../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from './../../../../Shared/ErrorPage/ErrorPage';
import Swal from 'sweetalert2';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { toast } from 'react-hot-toast';

const AllMembers = () => {
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();

    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['membersData', res_id],
        queryFn: async () => {


            const res = await axiosSecure.get(`/restaurant/${res_id}/all-member-list`);


            const res1 = {
                data: [
                    {
                        _id: "1",
                        displayName: "Farhan Hasan",

                        email: "nilok@gmail.com",

                        phoneNumber: "018399473783",


                        uid: "4385884935",


                        photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",

                    },
                    {
                        _id: "2",
                        f_name: "Fattan Prodan",

                        email: "nilok@gmail.com",

                        phoneNumber: "018399473783",


                        uid: "4385884935",

                        photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",

                    },

                    {
                        _id: "000",
                        f_name: "Gazi Fuad",

                        email: "sodome@gmail.com",

                        phoneNumber: "018399473783",

                        uid: "4385884935",


                        photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",

                    },
                ]

            }


            return res1?.data;
        },

    });

    const deleteMemberMutation = useMutation(async (userData) => {
        console.log(userData?._id)
        const res = await axiosSecure.delete(`/restaurant/${res_id}/branch/${branchID}/userID/${userData?._id}`)
        return res?.data;
    },
        {
            onSuccess: () => {
                // Refetch existing table data after a table is deleted
                dataRefetch();
                // Show success message using SweetAlert
                Swal.fire('Success', 'deleted successfully!', 'success');
            },
            onError: () => {
                // Show error message using SweetAlert
                Swal.fire('Error', 'An error occurred. Please try again.', 'error');
            },
        }
    )



    const handleRemoveMember = async (userData) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmDelete.isConfirmed) {
            await deleteMemberMutation.mutateAsync(userData);
        }
    }

    /**
     * 
     * ---------------------------------------------------------------------
     *                        ADD MEMBER
     */

    const handleAddMember = async (userData, reset, onOpenChange) => {


        const existingIndex = data.findIndex((item) => item?._id.toString() === userData?._id.toString());


        if (existingIndex !== -1) {
            // Table with the same ID exists, update its data
            // const updatedData = [...existingTableData];
            // updatedData[existingTableIndex] = formData;
            // await updateTableMutation.mutateAsync(updatedData);

            Swal.fire({
                icon: 'error',
                text: 'Member Already exists'
            })
            reset();
            return;

        } else {
            await axiosSecure.post(`/restaurant/${res_id}/add-new-member`, userData)
                .then(res => {
                    reset();

                    onOpenChange(); 
                    toast.success('saved successfully')
                    dataRefetch();
                }).catch(error => {
                    Swal.fire('Error', 'An error occurred. Please try again.', 'error');
                })


        }

    }

    if (dataLoading) {
        return <LoadingPage />
    }
    if (dataError) {
        return <ErrorPage />
    }



    return (
        <>
            <SetTitle title="All Members" />
            <div className='w-full flex'>
                <div className='w-3/4'>

                    <SectionTitle h2="All Members" />
                </div>
                <div className='w-1/4 flex justify-end'>
                    <AddMember refetch={dataRefetch} handleAddMember={handleAddMember} />
                </div>
            </div>


            {/* members  */}
            <div className="w-full mt-3 ">
                <div className="px-6  h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                    <div className='py-2'>
                        <div className='-mx-4 py-2 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                {
                                    data &&
                                    Array.isArray(data) &&
                                    <>
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
                                                        UID
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
                                                    >
                                                        Mobile
                                                    </th>


                                                    <th
                                                        scope='col'
                                                        className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                                    >
                                                        Remove
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>{
                                                data.map((item, _idx) => <tr key={_idx}>
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
                                                        {item?.uid}
                                                    </td>
                                                    <td className='px-2 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                                                        {item?.phoneNumber}
                                                    </td>




                                                    <td className='py-5 border-b border-gray-200 bg-white text-sm justify-center'>
                                                        <span
                                                            className='text-gray-900 whitespace-no-wrap flex flex-col md:flex-row gap-4 md:gap-0 items-center'
                                                        >
                                                            <button onClick={() => handleRemoveMember(item)} className="inline-flex ml-3 cursor-pointer text-gray-500 transition-colors duration-300 "> <IoMdRemoveCircleOutline className='w-5 h-5 text-red-400 hover:text-red-600' /></button>
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
    );
};

export default AllMembers;