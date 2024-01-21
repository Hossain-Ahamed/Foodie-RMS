import React from 'react';
import { Link } from 'react-router-dom';

const MyRestaurantCard = ({ data }) => {
    return (
        <>
            <Link to={`/restaurant/${data?.res_id}/branch/${data?.branchID}/ongoing-orders`} title={`Click to go to ${data?.res_name}'s panel`} className="block rounded-lg p-4 border border-slate-300 shadow-sm shadow-indigo-100">
                <img
                    alt="img"
                    src={data?.res_img}
                    className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2">
                    <dl>
                        <div>
                            <dt className="sr-only">Restaurant name</dt>

                            <dd className="font-medium">{data?.res_name} <span className='text-[10px] text-gray-400'>&#40;{data?.res_id}&#41;</span></dd>
                        </div>
                        <div>

                            <dt className="sr-only">Branch name</dt>
                            <dd className="text-sm text-gray-500">{data?.branch_name} <span className='text-[10px] text-gray-400'>&#40;{data?.branchID}&#41;</span></dd>
                        </div>


                    </dl>

              
                </div>
            </Link>
        </>
    );
};

export default MyRestaurantCard;