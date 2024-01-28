import React from 'react'
import SetTitle from '../../../Shared/SetTtitle/SetTitle'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import Dish_List_Row from './Dish_List_Row';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';

const Dish_List = () => {
  const axiosSecure = useAxiosSecure();
  const { branchID, res_id } = useRestauarantAndBranch();
  const { refetch, data: dishes = [], isLoading, error } = useQuery({
    queryKey: ['employee-list'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/dish-list`);
      return [
        {
          _id: 1,
          photo: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
          categoryName: "Italian Cuisine",
          dishTitle: "Pizza",
          status: true,
          regularPrice: '579',
          offerPrice: '379',
          preparationCost: '299',
          salesTax: "25",
          supplymentDuty: "27",
        },
        {
          _id: 2,
          photo: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
          categoryName: "Mexican Cuisine",
          dishTitle: "Pizza",
          status: true,
          regularPrice: '579',
          offerPrice: '379',
          preparationCost: '299',
          salesTax: "25",
          supplymentDuty: "27",
        },
        {
          _id: 3,
          photo: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
          categoryName: "Italian Cuisine",
          dishTitle: "Pizza",
          status: false,
          regularPrice: '579',
          offerPrice: '379',
          preparationCost: '299',
          salesTax: "25",
          supplymentDuty: "27",
        },
        {
          _id: 4,
          photo: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
          categoryName: "Asian Cuisine",
          dishTitle: "Rice bowl",
          status: true,
          regularPrice: '579',
          offerPrice: '379',
          preparationCost: '299',
          salesTax: "25",
          supplymentDuty: "27",
        },
        {
          _id: 5,
          photo: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
          categoryName: "Italian Cuisine",
          dishTitle: "Pizza",
          status: false,
          regularPrice: '579',
          offerPrice: '379',
          preparationCost: '299',
          salesTax: "25",
          supplymentDuty: "27",
        },
      ]
    }
  })
  return (
    <div className='max-w-[1600px] mx-auto mt-4'>
      <SetTitle title="Dish List" />
      <div className='flex gap-3'>
        <div className='w-full '>
          <SectionTitle h1="Dish List" />
        </div>
        <div>
          <Link to={`/restaurant/${res_id}/branch/${branchID}/add-dish`} className='flex justify-center items-center gap-2 text-white font-medium  px-4 py-2 bg-green-400 rounded-md text-nowrap '>Add Dish<IoAddOutline className='text-white' /></Link>

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
              <tbody>{dishes && dishes.map(dish => <Dish_List_Row key={dish._id} dish={dish} />)}</tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dish_List