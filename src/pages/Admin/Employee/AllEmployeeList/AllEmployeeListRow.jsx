import React from 'react';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';

const AllEmployeeListRow = ({ employee }) => {
    let statusStyle, paymentStatus, icon;
    switch (employee.role) {
        case 'Admin':
            statusStyle = 'bg-emerald-100 text-emerald-700'
            icon = <MdOutlineCheckCircle className="-ms-1 me-1.5 h-4 w-4" />
            break
        case 'Kitchen Staff':
            statusStyle = 'bg-purple-100 text-purple-700'
            break
        case 'Customer Service':
            statusStyle = 'bg-amber-100 text-amber-700'
            break
        case 'Others':
            statusStyle = 'bg-blue-100 text-blue-700'
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
                <div className='flex items-center '>
                    <div className='flex items-center gap-5 flex-col md:flex-row'>
                        <div className=''>
                            <img
                                alt='profile'
                                src={employee?.profilePhoto}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                        <div>
                            <span className='text-gray-900 whitespace-no-wrap block'>{employee?.f_name} {employee?.l_name}</span>
                            <span className='text-gray-900 whitespace-no-wrap block'>{employee?.email}</span>
                        </div>
                    </div>
                    <div className='ml-3'>
                        {/* <p className='text-gray-900 whitespace-no-wrap'>{category?.categoryID}</p> */}
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                    className='text-gray-900 whitespace-no-wrap block'
                >

                    {employee?.branchName}
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                    className='text-gray-900 whitespace-no-wrap block'
                >

                    {employee?.nid}
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>

                <a href={`tel:${employee.mobile}`} className='text-gray-600 whitespace-no-wrap block hover:underline cursor-pointer'>{employee?.mobile}</a>
            </td>


            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                    className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${statusStyle}`}
                >
                    {
                        icon
                    }

                    <p className="whitespace-nowrap text-sm text-center">{employee?.role}</p>
                </span>
            </td>
            <td className='py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                    className='text-gray-900 whitespace-no-wrap flex flex-col md:flex-row gap-4 md:gap-0 items-center'
                >
                    <Link title="Edit category" to={`/update-employee-profile/${employee?._id}`} className="inline-flex ml-3 cursor-pointer text-gray-500"><BiEditAlt size={25} /></Link>
                    <span title="Delete category" onClick={() => handleDeletecategory(employee._id)} className="inline-flex ml-3 cursor-pointer text-red-500"><FaTrashAlt size={25} /></span>
                </span>
            </td>
        </tr>

    );
};

export default AllEmployeeListRow;