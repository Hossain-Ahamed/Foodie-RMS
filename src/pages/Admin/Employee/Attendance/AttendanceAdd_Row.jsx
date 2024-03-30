import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdOutlineCheckCircle } from 'react-icons/md';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { SwalErrorShow } from '../../../../assets/scripts/Utility';
import edit from "../../../../assets/images/Home/edit.svg"
import trash from "../../../../assets/images/Home/delete.svg"


import { Select, SelectItem } from "@nextui-org/react";
import { toast } from 'react-hot-toast';



const AttendanceAdd_Row = ({ employee, axiosSecure, refetch }) => {




    const { branchID, res_id } = useRestauarantAndBranch();
    let statusStyle, paymentStatus, icon;
    switch (employee.role) {
        case 'Admin':
            statusStyle = 'bg-emerald-100 text-emerald-700'
            icon = <MdOutlineCheckCircle className="-ms-1 me-1.5 h-4 w-4" />
            break
        case 'Super-Admin':
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

    const [value, setValue] = React.useState("No");

    const handleSelectionChange = (e) => {
        setValue(e.target.value);
        
        const selection = e.target.value;
        const currentDate = new Date(); 
        const isoDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0, 0); 
        
        const data = {
            date: isoDate.toISOString() 
        };
        
        if(selection === "Yes") {
            data.status = true;
        } else {
            data.status = false;
        }
        
        axiosSecure.patch(`/restaurant/${res_id}/branch/${branchID}/modify-attendance/${employee?._id}`,data)
        .then(res=>toast.success('Changed Successfully'))
        .catch(e=>toast.error('Error !Try Again'))
    };

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
            <td className='py-5  bg-white text-sm flex justify-center items-center gap-3'>

                <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                       
                        variant="underlined"
                        
                        selectedKeys={[value]}
                        className="max-w-xs border-0"
                        onChange={handleSelectionChange}
                    >
                        {[
                            {
                                "title": "Yes",
                                value: true,
                            },
                            {
                                "title": "No",
                                value: false,
                            }
                        ].map((i) => (
                            <SelectItem key={i.title} value={i.value}>
                                {i.title}
                            </SelectItem>
                        ))}
                    </Select>
                  
                </div>

            </td>

        </tr>

    );
};

export default AttendanceAdd_Row;