import { useQuery } from "react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SetTitle from "../../../Shared/SetTtitle/SetTitle";
import DishCategoryRow from "./DishCategoryRow";
import { Link } from "react-router-dom";
import useRestauarantAndBranch from "../../../../Hooks/useRestauarantAndBranch";
import CategoryPagination from "../../../../components/Pagination/CategoryPagination";
import Dropdown from "../../../../components/Dashboard/Dropdown/Dropdown";

const DishCategory_List = () => {
    const axiosSecure = useAxiosSecure();
    const { branchName, restaurantName } = useRestauarantAndBranch();
    const ranges = [5,10,20,30,50,100]
    const { refetch, data: categories = [], isLoading, error } = useQuery({
        queryKey: ['ongoing-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/ongoing-orders`);
            return [
                {
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    category_name: "Meat Box",
                    branch: "19/7 chasara",
                    resturant_name: "Falafel",
                    table: "4",
                    status: "Active",
                    order_site: "Onsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj",
                    categoryID: 123,
                },
                {
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    category_name: "Meat Box",
                    branch: "19/7 chasara",
                    resturant_name: "Falafel",
                    table: "4",
                    status: "Active",
                    order_site: "Onsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj2",
                    categoryID: 123,
                },
                {
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    category_name: "Meat Box",
                    branch: "19/7 chasara",
                    resturant_name: "Falafel",
                    table: "4",
                    status: "Inactive",
                    order_site: "Onsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj3",
                    categoryID: 123,
                },
                {
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    category_name: "Meat Box",
                    branch: "19/7 chasara",
                    resturant_name: "Falafel",
                    table: "4",
                    status: "Active",
                    order_site: "Onsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj4",
                    categoryID: 123,
                },
                {
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    category_name: "Meat Box",
                    branch: "19/7 chasara",
                    resturant_name: "Falafel",
                    table: "4",
                    status: "Inactive",
                    order_site: "Offsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj5",
                    categoryID: 123,
                },
                {
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    category_name: "Meat Box",
                    branch: "19/7 chasara",
                    resturant_name: "Falafel",
                    table: "4",
                    status: "Inactive",
                    order_site: "Offsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj6",
                    categoryID: 123,
                },
                {
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    category_name: "Meat Box",
                    branch: "19/7 chasara",
                    resturant_name: "Falafel",
                    table: "4",
                    status: "Active",
                    order_site: "Offsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj7",
                    categoryID: 123,
                },
                {
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    category_name: "Meat Box",
                    branch: "19/7 chasara",
                    resturant_name: "Falafel",
                    table: "4",
                    status: "Inactive",
                    order_site: "Offsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj8",
                    categoryID: 123,
                },
                {
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    category_name: "Meat Box",
                    branch: "19/7 chasara",
                    resturant_name: "Falafel",
                    table: "4",
                    status: "Active",
                    order_site: "Offsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj9",
                    categoryID: 123,
                },
            ]
        }
    });
    const itemsPerPage = 2;
    const size = categories.length;
    const totalPage = Math.ceil(size/itemsPerPage)
    const numberOfButtons = [...Array(totalPage).keys()]
    // console.log(OngoingOrders)
    return (
        <div className="bg-gray-100 rounded-md">
            <div className='container mx-auto px-4 sm:px-8 select-none'>
                <SetTitle title="Ongoing Order" />
               <div className="flex items-center justify-between flex-col-reverse md:flex-row">
                    
                    <div className="relative mt-5">

                        <input
                            type="text"
                            id="Search"
                            placeholder="Search for..."
                            className="w-full max-w-lg rounded-md border-gray-200 py-2.5 px-5 shadow-sm sm:text-sm"
                        />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                            <button type="button" className="text-gray-600 hover:text-gray-700">
                                <span className="sr-only">Search</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </button>
                        </span>
                    </div>
                    <div className="flex items-center gap-5">
                        <div>
                            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Select range </label>
                            <select
                                name="dataRange"
                                id="HeadlineAct"
                                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2.5 px-4"
                            >
                                {
                                    ranges.map((range, idx) => <option key={idx} value={range}>{range}</option>)
                                }
                                {/* <option value="">5</option>
                            <option value="JM">10</option>
                            <option value="SRV">20</option>
                            <option value="JH">30</option>
                            <option value="BBK">50</option>
                            <option value="AK">100</option> */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Select status </label>
                            <select
                                name="dataRange"
                                id="HeadlineAct"
                                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2.5 px-4"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <Link
                            className="inline-block mt-5 rounded border border-indigo-600 md:px-12 md:py-2.5 px-10 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                            to={`/restaurant/${restaurantName}/branch/${branchName}/add-category`}
                        >
                            Add Category
                        </Link>
                    </div>
                    {/* dropdown for Pagination range */}
               </div>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Category
                                        </th>
                                        {/* <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Category Name
                                    </th> */}
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                        >status</th>
                                        {/* <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Priority
                                    </th> */}
                                        {/* <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        To
                                    </th> */}
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{categories.map(category => <DishCategoryRow key={category.location} category={category} />)}</tbody>
                            </table>
                        </div>
                    </div>
                    <CategoryPagination size={numberOfButtons}/>
                </div>
            </div>
        </div>
    )
}

export default DishCategory_List