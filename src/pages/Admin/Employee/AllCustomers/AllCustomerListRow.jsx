import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdOutlineCheckCircle } from 'react-icons/md';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { SwalErrorShow } from '../../../../assets/scripts/Utility';
import edit from "../../../../assets/images/Home/edit.svg"
import trash from "../../../../assets/images/Home/delete.svg"




const AllCustomerListRow = ({ customer, axiosSecure, refetch }) => {

    // let statusStyle, paymentStatus, icon;
    // switch (customer.role) {
    //     case 'Admin':
    //         statusStyle = 'bg-emerald-100 text-emerald-700'
    //         icon = <MdOutlineCheckCircle className="-ms-1 me-1.5 h-4 w-4" />
    //         break
    //     case 'Super-Admin':
    //         statusStyle = 'bg-emerald-100 text-emerald-700'
    //         icon = <MdOutlineCheckCircle className="-ms-1 me-1.5 h-4 w-4" />
    //         break
    //     case 'Kitchen Staff':
    //         statusStyle = 'bg-purple-100 text-purple-700'
    //         break
    //     case 'Customer Service':
    //         statusStyle = 'bg-amber-100 text-amber-700'
    //         break
    //     case 'Delivery Boy':
    //         statusStyle = 'bg-blue-100 text-blue-700'
    //         break
    // }
    // const handleDeleteCustomer = id => {
    //     if (customer?.role === "Super-Admin") {
    //         Swal.fire({
    //             title: "Deleted!",
    //             text: "Super Admin can not be deleted",
    //             icon: "error"
    //         });
    //         return;
    //     }
    //     console.log(id)
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: `You want to remove ${customer?.f_name} ${customer?.l_name} from your customer`,
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {

    //             axiosSecure.delete(`/admin/restaurant/${res_id}/branch/${branchID}/delete/customer/${customer?._id}`)
    //                 .then(res => {
    //                     Swal.fire({
    //                         title: "Deleted!",
    //                         text: "Your file has been deleted.",
    //                         icon: "success"
    //                     });
    //                     refetch();
    //                 })
    //                 .catch(e => {
    //                     console.error(e);
    //                     SwalErrorShow(e);
    //                 })

    //         }
    //     });
    // }
    return (

        <tr className='border-b'>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center '>
                    <div className='flex items-center gap-5 flex-col md:flex-row'>
                        <div className=''>
                            <img
                                alt='profile'
                                src={customer?.imgURL}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                        <div>
                            <span className='text-gray-900 whitespace-no-wrap block'>{customer?.name}</span>
                            <span className='text-gray-900 whitespace-no-wrap block'>{customer?.email}</span>
                        </div>
                    </div>
                    <div className='ml-3'>
                        {/* <p className='text-gray-900 whitespace-no-wrap'>{category?.categoryID}</p> */}
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <a href={`tel:${customer.phone}`} className='text-gray-600 whitespace-no-wrap block hover:underline cursor-pointer'>{customer?.phone}</a>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span
                    className='text-gray-900 whitespace-no-wrap block'
                >

                    {customer?.gender}
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>

                <span className='text-gray-900 whitespace-no-wrap block cursor-pointer'>{customer?.address?.streetAddress}, {customer?.address?.city}, {customer?.address?.stateProvince}, {customer?.address?.postalCode}, {customer?.address?.city}</span>
            </td>
        </tr>

    );
};

export default AllCustomerListRow;