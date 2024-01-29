import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { MdClear, MdOutlineCheckCircle } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';

const Dish_List_Row = ({dish}) => {
    const { branchID, res_id } = useRestauarantAndBranch();
    let statusStyle, paymentStatus, icon; 
    switch (dish.status) {
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
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
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
                                src={dish?.photo}
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

                    <p className="whitespace-nowrap text-sm">{dish?.status ? "Active" : "Inactive"}</p>
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
                    <Link to={`/restaurant/${res_id}/branch/${branchID}/edit-dish/${dish?._id}`} title="Edit category" className="inline-flex ml-3 cursor-pointer text-gray-500"><BiEditAlt size={25} /></Link>
                    <span title="Delete category" onClick={() => handleDeletecategory(dish._id)} className="inline-flex ml-3 cursor-pointer text-red-500"><FaTrashAlt size={25} /></span>
                </span>
            </td>
            {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${paymentStatus}`}><p className="whitespace-nowrap text-sm text-center">{category?.payment_status}</p></span>
            </td> */}
            {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                    <Link to={`/restaurant/${restaurantName}/branch/${branchName}/edit-category/:${category?.categoryID}`} title="Edit category" className="inline-flex ml-3 cursor-pointer text-gray-500 transition-colors duration-300 hover:border-b-2 hover:border-b-blue-400"><BiEditAlt size={25} /></Link>
                    <span title="Delete category" onClick={() => handleDeletecategory(employee.categoryID)} className="inline-flex ml-3 cursor-pointer text-red-500 transition-colors duration-300 hover:border-b-2 hover:border-b-blue-400"><MdClear size={25} /></span>
                </td> */}
        </tr>

    );
};

export default Dish_List_Row;