import React from 'react';
import { MdClear, MdOutlineCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import edit from "../../../../assets/images/Home/edit.svg"
import trash from "../../../../assets/images/Home/delete.svg"
import dishIcon from "../../../../assets/images/Home/dish.svg"
import { SwalErrorShow } from '../../../../assets/scripts/Utility';
const Dish_List_Row = ({ dish, axiosSecure, refetch }) => {
    const { branchID, res_id } = useRestauarantAndBranch();
    let statusStyle, icon;
    // setting color and icon for dish status
    switch (dish?.isActive) {
        case true:
            statusStyle = 'bg-emerald-100 text-emerald-700'
            icon = <MdOutlineCheckCircle className="-ms-1 me-1.5 h-4 w-4" />
            break
        case false:
            statusStyle = 'bg-red-100 text-red-700'
            icon = <MdClear className="-ms-1 me-1.5 h-4 w-4" />
            break
    }

    const handleDeletecategory = id => {
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
                // deleting dish request
                axiosSecure.delete(`/admin/delete-dishes/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Dish has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    })
                    .catch(err => SwalErrorShow(err))
            }
        });
    }
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div>
                    <div className='flex items-center gap-5 flex-col md:flex-row'>
                        <div className=''>
                            <img
                                alt='profile'
                                src={dish?.img}
                                className='mx-auto object-cover rounded h-10 w-15'
                            />
                        </div>
                        <div>
                            <span className='text-gray-900 whitespace-no-wrap block'>{dish?.title}</span>
                        </div>
                    </div>
                </div>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                    className='text-gray-900 whitespace-no-wrap block text-center'
                >

                    {dish?.category}
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span
                    className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${statusStyle}`}
                >
                    {
                        icon
                    }

                    <p className="whitespace-nowrap text-sm">{dish?.isActive ? "Active" : "Inactive"}</p>
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span
                    className='text-gray-900 whitespace-no-wrap block'
                >

                    {dish?.preparation_cost} ৳
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span
                    className='text-gray-900 whitespace-no-wrap block'
                >

                    {dish?.price} ৳
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>

                <span className='text-gray-600 whitespace-no-wrap block'>{dish?.offerPrice} ৳</span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>

                <span className='text-gray-600 whitespace-no-wrap block'>{dish?.sales_tax} %</span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>

                <span className='text-gray-600 whitespace-no-wrap block'>{dish?.supplementary_duty} %</span>
            </td>

            <td className='py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                    className='text-gray-900 whitespace-no-wrap flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-center'
                >
                    <Link to={`/edit-dish/${dish?._id}`} title="Edit category" className="inline-flex ml-3 cursor-pointer text-gray-500"><img src={edit} /></Link>
                    <span title="Delete category" onClick={() => handleDeletecategory(dish?._id)} className="inline-flex ml-3 cursor-pointer text-red-500"><img src={trash} /></span>
                    <Link to={`/recipe/${dish?._id}`} title="Add Recipe" className="inline-flex ml-3 cursor-pointer text-gray-500"><img src={dishIcon} /></Link>
                </span>
            </td>
        </tr>

    );
};

export default Dish_List_Row;