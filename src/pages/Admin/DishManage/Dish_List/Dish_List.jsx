import React, { useState } from 'react'
import SetTitle from '../../../Shared/SetTtitle/SetTitle'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import Dish_List_Row from './Dish_List_Row';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';

const Dish_List = () => {
  const axiosSecure = useAxiosSecure();
  const { branchID, res_id, role } = useRestauarantAndBranch();
  const [selectedRange, setSelectedRange] = useState(30);
  const [selectActive, setSelectActive] = useState("all");
  const [currentPage, setCurrentPage] = useState(0)
  const ranges = [10, 20, 30, 50, 100]
  const { refetch, data: data = [], isLoading, error } = useQuery({
    queryKey: ['employee-list', selectedRange, selectActive, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/get-all-dishes/${branchID}?currentPage=${currentPage}&dataSize=${selectedRange}&status=${selectActive}`);
      return res.data
    }
  })
  if (isLoading) {
    return <LoadingPage />
  }
  if (error) {
    return <ErrorPage />
  }
  return (
    <div className='max-w-[1600px] mx-auto mt-4'>
      <SetTitle title="Dish List" />
      <div className='flex gap-3 justify-between items-center md:flex-row flex-col-reverse'>
        <div>
          <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Select range </label>
          <select
            name="dataRange"
            id="HeadlineAct"
            className="mt-1.5 border w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2.5 px-4"
            onChange={(event) => setSelectedRange(event.target.value)}
            defaultValue={selectedRange}
          >
            {
              ranges.map((range, idx) => <option key={idx} value={range}>{range}</option>)
            }
          </select>
        </div>
        <div>
          <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Select status </label>
          <select
            className="mt-1.5 border w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2.5 px-4"
            onClick={(event) => setSelectActive(event.target.value)}
            defaultValue={selectActive}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className='w-full flex-1'>
          <SectionTitle h1="Dish List" />
        </div>
        <div>
          {
            ['Admin', 'Super-Admin'].includes(role) && <>
              <Link to={`/add-dish`}
                className='flex justify-center items-center gap-2 text-white font-medium  px-4 py-2 bg-green-400 rounded-md text-nowrap'>Add Dish<IoAddOutline className='text-white' />
              </Link>
            </>
          }
        </div>

      </div>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal '
                  >
                    Dish Title
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                  >Dish Category Name</th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                  >Status</th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
                  >
                    Preparation Cost (৳)
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
                  >
                    Regular Price (৳)
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                  >
                    Offer Price (৳)
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                  >
                    Sales Tax (%)
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                  >
                    Supplyment Duty (%)
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{data?.dishes && Array.isArray(data?.dishes) && data?.dishes.map(dish => <Dish_List_Row key={dish._id} dish={dish} axiosSecure={axiosSecure} refetch={refetch} />)}</tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dish_List