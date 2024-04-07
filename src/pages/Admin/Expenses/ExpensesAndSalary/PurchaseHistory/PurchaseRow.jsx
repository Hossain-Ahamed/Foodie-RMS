import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import trash from "../../../../../assets/images/Home/delete.svg"
import edit from "../../../../../assets/images/Home/edit.svg"
import toast from 'react-hot-toast';
import { SwalErrorShow } from '../../../../../assets/scripts/Utility';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';

const PurchaseRow = ({ purchase, branchID, res_id, refetch }) => {
    const axiosSecure = useAxiosSecure()
    let dueAmount = parseFloat(purchase?.expense) - parseFloat(purchase?.totalPayment)

    let status = "";
    if (dueAmount > 0) {
        status = "Due";
    } else if (dueAmount < 0 || dueAmount === 0) {
        status = "Paid"
    }
    const handleDeleteOrder = id => {
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
                // for deleting expense
                axiosSecure.delete(`/admin/${res_id}/branch/${branchID}/delete-expenses/${id}`)
                    .then(res => {
                        toast.success("Expense Deleted Successfully")
                        refetch()
                    })
                    .catch(err => SwalErrorShow(err))
            }
        });
    }
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className='text-gray-900 whitespace-no-wrap block'><p className="whitespace-nowrap text-sm text-center">{purchase?.category}</p></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className='text-gray-900 whitespace-no-wrap block'><p className="whitespace-nowrap text-sm text-center">{purchase?.billDate}</p></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{purchase?.transactions[0]?.paymentDate}</span></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{purchase?.payTo}</span></span>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{purchase?.expense}</span></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{purchase?.totalPayment}</span></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{dueAmount}</span></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span
                    className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                >

                    {status}
                </span>
            </td>
            {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${paymentStatus}`}><p className="whitespace-nowrap text-sm text-center">{order?.payment_status}</p></span>
            </td> */}
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <Link to={`/edit-expenses/${purchase?._id}`} title="Edit Order" className="inline-flex ml-3 cursor-pointer"><img src={edit} /></Link>
                <span title="Delete category" onClick={() => handleDeleteOrder(purchase?._id)} className="inline-flex ml-3 cursor-pointer"><img src={trash} /></span>
            </td>
        </tr>
    )
}


export default PurchaseRow;