import { MdOutlineCheckCircle, MdClear, } from "react-icons/md";
// import { BiEditAlt } from "react-icons/bi";
// import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useRestauarantAndBranch from "../../../../Hooks/useRestauarantAndBranch";
import edit from "../../../../assets/images/Home/edit.svg"
import trash from "../../../../assets/images/Home/delete.svg"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { SwalErrorShow } from "../../../../assets/scripts/Utility";

const DishCategoryRow = ({ category, refetch, isLoading }) => {
    // console.log(category);
    const axiosSecure = useAxiosSecure()
    const { branchName, restaurantName } = useRestauarantAndBranch();
    let statusStyle, paymentStatus, icon;
    switch (category.active) {
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
                axiosSecure.delete(`/admin/delete-categories/${id}`)
                .then(res => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your category has been deleted.",
                        icon: "success"
                    });
                    isLoading = false
                    refetch()
                })
                .catch(err => SwalErrorShow(err))
            }
        });
    }
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex items-center flex-col md:flex-row gap-5'>
                        <div className=''>
                            <img
                                alt='profile'
                                src={category?.img}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                        <div>
                            <span className='text-gray-900 whitespace-no-wrap block'>{category?.title}</span>
                            {/* <span className='text-gray-900 whitespace-no-wrap block'>Dish: </span> */}
                        </div>
                    </div>
                    <div className='ml-3'>
                        {/* <p className='text-gray-900 whitespace-no-wrap'>{category?.categoryID}</p> */}
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span
                    className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${statusStyle}`}
                >
                    {
                        icon
                    }

                    <p className="whitespace-nowrap text-sm text-center">{category?.active ? "Active" : "Inactive"}</p>
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                 
                <span className='text-gray-600 whitespace-no-wrap block'>{category?.description}</span>
            </td>
           
            {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${paymentStatus}`}><p className="whitespace-nowrap text-sm text-center">{category?.payment_status}</p></span>
            </td> */}
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <Link to={`/edit-category/${category?._id}`} title="Edit category" className="inline-flex ml-3 cursor-pointer text-gray-500"><img src={edit} /></Link>
                {/* <span title="Delete category" onClick={() => handleDeletecategory(category.categoryID)} className="inline-flex ml-3 cursor-pointer text-red-500 transition-colors duration-300 hover:border-b-2 hover:border-b-blue-400"><MdClear size={25} /></span> */}
                <span title="Delete category" onClick={() => handleDeletecategory(category?._id)} className="inline-flex ml-3 cursor-pointer text-red-500"><img src={trash} /></span>
            </td>
        </tr>
    )
}

export default DishCategoryRow