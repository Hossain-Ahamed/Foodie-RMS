import React from 'react';
import edit from '../../../../assets/images/Home/edit.svg'
import trash from '../../../../assets/images/Home/delete.svg'
import Swal from 'sweetalert2';
import EditVendorModal from '../../../../components/Modal/EditVendorModal/EditVendorModal';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { SwalErrorShow } from '../../../../assets/scripts/Utility';
const VendorsRow = ({ vendor, res_id, branchID, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const handleDeleteVendor = id => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/admin/${res_id}/branch/${branchID}/delete-vendor/${id}`)
                .then(res => {
                    toast.success('Vendor Deleted Successfully')
                    refetch();
                })
                .catch(err => SwalErrorShow(err))
            }
        });
    }
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className="whitespace-nowrap text-sm text-center">{vendor?.name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <p className="whitespace-nowrap text-sm text-center">{vendor?.phone}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className="whitespace-nowrap text-sm text-center">{vendor?.address}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span title="Edit Order" className="inline-flex ml-3 cursor-pointer text-gray-500"><EditVendorModal id={vendor?._id} data={vendor} refetch={refetch}/></span>
                <span title="Delete category" onClick={() => handleDeleteVendor(vendor?._id)} className="inline-flex ml-3 cursor-pointer text-red-500"><img src={trash} /></span>
            </td>
        </tr>
    );
};

export default VendorsRow;