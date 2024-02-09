import { useQuery } from "react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SetTitle from "../../../Shared/SetTtitle/SetTitle";
import DishCategoryRow from "./DishCategoryRow";
import { Link } from "react-router-dom";
import useRestauarantAndBranch from "../../../../Hooks/useRestauarantAndBranch";
import CategoryPagination from "../../../../components/Pagination/CategoryPagination";
import { useEffect, useState } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import TableLoading from "../../../Shared/LoadingPages/TableLoading/TableLoading";
import LoadingPage from "../../../Shared/LoadingPages/LoadingPage/LoadingPage";
import ErrorPage from "../../../Shared/ErrorPage/ErrorPage";

const DishCategory_List = () => {
    const axiosSecure = useAxiosSecure();
    const { branchID, res_id } = useRestauarantAndBranch();
    const [searchQuery, setSearchQuery] = useState('')
    const [numberOfButtons, setNumberOfButtons] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [selectedRange, setSelectedRange] = useState(30);
    const [selectActive, setSelectActive] = useState("all")
    const [currentPage, setCurrentPage] = useState(0)
    const ranges = [10, 20, 30, 50, 100]
    const { refetch, data: data = {}, isLoading, error } = useQuery({
        queryKey: ['ongoing-orders', selectedRange, selectActive, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/ongoing-orders?search=${searchQuery}&currentPage=${currentPage}&dataSize=${selectedRange}&status=${selectActive}`);
            // console.log(res?.data)
            setTotalPage(Math.ceil(res.data.total / selectedRange))
            // {
            //     categoryID: "fa235f",
            //     categoryPhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
            //     categoryTitle: "Meat Box",
            //     description: "Hello guys chai pee lo",
            //     status: true
            // },
            return res.data
        }
    });

    // useEffect(() => {
    //     if(totalPage)
    //     setNumberOfButtons([...Array(totalPage).keys()])
    // }, [totalPage])

    useEffect(() => {
        if (typeof totalPage === 'number' && totalPage > 0) {
            // Limit the maximum length of the array if needed
            const maxLength = 1000; // Adjust as needed
            const length = Math.min(totalPage, maxLength);
            console.log(length)

            // Create an array with the specified length
            setNumberOfButtons([...Array(length).keys()]);
        }
    }, [totalPage]);

    if (isLoading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }
    // const itemsPerPage = 2;
    // const size = data.length;
    // const totalPage = setTotalPage(Math.ceil(res.data.count / numberOfSizeInTableData))
    // const numberOfButtons = [...Array(totalPage).keys()]
    // console.log(OngoingOrders)
    return (
        <div className="rounded-md">
            <div className='container mx-auto px-4 sm:px-8 select-none'>
                <SetTitle title="Ongoing Order" />
                <SectionTitle h1='Category' />
                <div className="flex items-center justify-between flex-col md:flex-row md:mt-5 lg:mt-0">

                    <div className="relative mt-5 w-full max-w-md">

                        <input
                            type="text"
                            id="Search"
                            placeholder="Search for..."
                            className="w-full max-w-lg rounded-md border border-gray-400 py-2.5 px-5 shadow-sm sm:text-sm"
                            onChange={(event) => setSearchQuery(event.target.value)}
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
                    <div className="flex items-center flex-col-reverse md:flex-row gap-6">
                        <div>
                            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Select range </label>
                            <select
                                name="dataRange"
                                id="HeadlineAct"
                                className="mt-1.5 border w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2.5 px-4"
                                onChange={(event) => setSelectedRange(event.target.value)}
                                defaultValue={30}
                            >
                                {
                                    ranges.map((range, idx) => <option key={idx} value={range}>{range}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Select status </label>
                            <select
                                name="dataRange"
                                id="HeadlineAct"
                                className="mt-1.5 border w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2.5 px-4"
                                onClick={(event) => setSelectActive(event.target.value)}
                                defaultValue='all'
                            >
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <Link
                            className="inline-block mt-5 rounded border border-indigo-600 px-8 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                            to={`/add-category`}
                        >
                            Add Category
                        </Link>
                    </div>
                </div>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden relative'>
                            {isLoading && <TableLoading />}
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Category
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                        >Status</th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                        >Description</th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{data?.data && Array.isArray(data?.data) && data?.data.map((category, _idx) => <DishCategoryRow key={_idx} category={category} />)}</tbody>
                            </table>
                        </div>
                    </div>
                    <CategoryPagination size={numberOfButtons} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </div>
    )
}

export default DishCategory_List