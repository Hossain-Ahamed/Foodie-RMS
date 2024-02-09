import React from 'react';
import { NavLink, } from 'react-router-dom';

import { PiBowlFoodBold } from "react-icons/pi";

import { IoFastFoodOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";

const CustomerService = () => {
    return (
        <>


            {/* orders  */}
            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                        className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                    >
                        <div className="flex items-center gap-2">
                            <IoFastFoodOutline className='h-5 w-5 opacity-75' />
                            <span className="text-sm font-medium">Manage Orders </span>
                        </div>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <NavLink to={`/ongoing-orders`}
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                        : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                }
                            >

                                <span className="text-sm font-medium"> Orders </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/place-order`}
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                        : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                }>


                                <span className="text-sm font-medium"> Place Order </span>
                            </NavLink>
                        </li>

                    </ul>
                </details>
            </li>




            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                        className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                    >
                        <div className="flex items-center gap-2">
                            <PiBowlFoodBold className='h-5 w-5 opacity-75' />

                            <span className="text-sm font-medium"> Menu </span>
                        </div>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <NavLink to={`/category`}
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                        : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                }
                            >
                                Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/dish-list`}
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                        : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                }
                            >
                                Dishes
                            </NavLink>
                        </li>

                    </ul>
                </details>
            </li>

            {/* offers coupon member */}
            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                        className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 20">
                                <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                            </svg>

                            <span className="text-sm font-medium"> Offers </span>
                        </div>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">

                        <li>
                            <NavLink to={`/coupon-list`}
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                        : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                }
                            >
                                Coupons
                            </NavLink>
                        </li>

                    </ul>
                </details>
            </li>
        </>
    );
};

export default CustomerService;