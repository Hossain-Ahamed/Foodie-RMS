import { useQuery } from "react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SetTitle from "../../../pages/Shared/SetTtitle/SetTitle";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Paginator from "../../../pages/Shared/Paginator/Pagiantor";
import { useState ,useEffect} from "react";
import ErrorPage from "../../../pages/Shared/ErrorPage/ErrorPage";
import RangeBar from "../../../pages/Shared/Rangebar/RangeBar";
import { HiOutlineRefresh } from 'react-icons/hi';
import TableLoading from "../../../pages/Shared/LoadingPages/TableLoading/TableLoading";
import useRestauarantAndBranch from "../../../Hooks/useRestauarantAndBranch";
import OrderListForKitchenStuffTableRow from "./OrderListForKitchenStuffTableRow";
const OrderListForKitchenStuff = () => {




    const {res_id,branchID} = useRestauarantAndBranch();

    /**
  * ----------------------------------------------------------------------------------------------------------------
  * ----------------------------------------------------------------------------------------------------------------
  *                       PAGINATOR & RANGE BAR
  *------------------------------------------------------------------------------------------------------------
  *------------------------------------------------------------------------------------------------------------
 */


    //------------------------------------Data-------------------------------------------------------
    const [DataArrayList, setDataArrayList] = useState([]);

    // search bar 
    const [searchValue, setPageSearchValue] = useState('')


    // ----------------------------paginator ---------------------------------

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);  //set from axios response

    //-----------------------------  RANGE BAR--------------------------------------------

    const [numberOfSizeInTableData, setnumberOfSizeInTableData] = useState(15);  // page number size  15 30 50 100 500
    const [typeOfRange, settypeOfRange] = useState('All');  // All , Last 7days , last 30 days , Custom 

    const [startingDate, setStartingDate] = useState(new Date(new Date().setDate(new Date().getDate() - 6)).toISOString().slice(0, 10));  //starting date
    const [EndingDate, setEndingDate] = useState(new Date().toISOString().slice(0, 10)); //ending date

    /**
    *-----------------------------------------------------------------------------------------------------------
    *-----------------------------------------------------------------------------------------------------------
    *-----------------------------------------------------------------------------------------------------------
    */



    const axiosSecure = useAxiosSecure();
  



    const { data: responseData = {}, isLoading: queryLoading, error: queryError, refetch } = useQuery({
        queryKey: ["orders", searchValue, currentPage, numberOfSizeInTableData, typeOfRange, startingDate, EndingDate,res_id,branchID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/restaurant/${res_id}/branch/${branchID}/active-orders-list/kitchen-staff?search=${searchValue}&currentPage=${currentPage - 1}&numberOfSizeInTableData=${numberOfSizeInTableData}&typeOfRange=${typeOfRange}&startingDate=${startingDate}&endingDate=${EndingDate}`)

            // console.log(res.data)
            if (res.data?.DataArrayList && Array.isArray(res.data?.DataArrayList)) {
                setDataArrayList(res.data?.DataArrayList)
            }

            setTotalPage(Math.ceil(res.data.count / numberOfSizeInTableData))
            // current second 
            // console.log(new Date().toLocaleTimeString('en-US', { hour12: false }))
            return res.data;
        },
    });

    useEffect(() => {
        const myFunction = () => {
            refetch();
            // console.log('object')
        };
    
        // Call myFunction after 15 seconds
        const timeoutId = setTimeout(() => {
          myFunction();
    
          // Set up the next call after 15 seconds
          const intervalId = setInterval(myFunction, 10000);
    
          // Clear the interval when the component unmounts
          return () => clearInterval(intervalId);
        }, 15000);
    
        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
      }, []); // Empty dependency array ensures the effect runs only once

    const setToDefaultForRefetch = async () => {
        settypeOfRange("All");
        setCurrentPage(1);
        setPageSearchValue("");
        return;
    }

    const refetchTheData = async () => {
        await setToDefaultForRefetch();
        refetch();
    }

    if (queryError) {
        return <ErrorPage errorCode={queryError?.code} errorMessage={`${queryError?.response?.statusText + ". " + queryError?.message}`} />
    }
    // console.log(OngoingOrders)
    return (
        <div className='container mx-auto px-4 sm:px-8 select-none'>
            <SetTitle title="Ongoing Order" />
            <SectionTitle h1='Orders' />
            <div className='flex justify-end'>

                <div className="text-white bg-root-100 hover:bg-root-200 text-lg py-1  px-3 lg:px-5 rounded-3xl text-center flex items-center user-select-none cursor-pointer" onClick={refetchTheData}>
                    <p className='pr-2'>Refresh</p>
                    <HiOutlineRefresh />
                </div>
            </div>

            {/* search  */}
            <RangeBar
                numberOfSizeInTableData={numberOfSizeInTableData}
                setNumberOfSizeInTable={setnumberOfSizeInTableData}
                typeOfRange={typeOfRange}
                settypeOfRange={settypeOfRange}
                startingDate={startingDate}
                setStartingDate={setStartingDate}
                EndingDate={EndingDate}
                setEndingDate={setEndingDate}
                setCurrentPage={setCurrentPage}

                pageTitle="Active orders List"


                placeholder="search by phone or Status"

                searchValue={searchValue}
                setPageSearchValue={setPageSearchValue}


                refetch={refetch}

            />

            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        {
                            queryLoading && <TableLoading />

                        }
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                    >
                                        Customer
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Order ID
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Payment Status
                                    </th>
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
                            <tbody>{DataArrayList && Array.isArray(DataArrayList) && DataArrayList.map((order, _idx) => <OrderListForKitchenStuffTableRow key={_idx} order={order} PaymentType={responseData?.paymentTypes} refetch={refetch}/>)}</tbody>
                        </table>
                        <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPage} refetch={refetch} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderListForKitchenStuff