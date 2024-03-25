import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import trash from "../../../../assets/images/Home/delete.svg"
import edit from "../../../../assets/images/Home/edit.svg"
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { SwalErrorShow } from '../../../../assets/scripts/Utility';
const ExpenseRow = ({ expense, branchID, res_id, refetch }) => {
    const axiosSecure = useAxiosSecure()
    let dueAmount = parseFloat(expense?.expense) - parseFloat(expense?.totalPayment)

    let status = "";
    if(dueAmount > 0){
        status = "Due";
    } else if(dueAmount < 0 || dueAmount === 0){
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
                <span className='text-gray-900 whitespace-no-wrap block'><p className="whitespace-nowrap text-sm text-center">{expense?.category}</p></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className='text-gray-900 whitespace-no-wrap block'><p className="whitespace-nowrap text-sm text-center">{expense?.billDate}</p></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{expense?.transactions[0]?.paymentDate}</span></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{expense?.payTo}</span></span>
            </td>
           
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{expense?.expense}</span></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{expense?.totalPayment}</span></span>
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
                <Link to={`/edit-expenses/${expense?._id}`} title="Edit Order" className="inline-flex ml-3 cursor-pointer"><img src={edit} /></Link>
                <span title="Delete category" onClick={() => handleDeleteOrder(expense?._id)} className="inline-flex ml-3 cursor-pointer"><img src={trash} /></span>
            </td>
        </tr>
    )
}


export default ExpenseRow;