import React from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { PiBowlFoodBold } from "react-icons/pi";
import useRestauarantAndBranch from '../../../Hooks/useRestauarantAndBranch';
import { IoFastFoodOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import AdminSideNavChoose from './AdminSideNavChoose';
import { TbSpeakerphone } from "react-icons/tb";
const SuperAdminNav = () => {
    return (
        <>
            <>


                <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="h-5 w-5 opacity-75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.99658 8.5H11.4966" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.99658 16.5H7.99658" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.4966 16.5H14.4966" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21.9966 12.03V16.11C21.9966 19.62 21.1066 20.5 17.5566 20.5H6.43658C2.88658 20.5 1.99658 19.62 1.99658 16.11V7.89C1.99658 4.38 2.88658 3.5 6.43658 3.5H14.4966" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.0766 4.13L15.3666 7.84C15.2266 7.98 15.0866 8.26 15.0566 8.46L14.8566 9.88C14.7866 10.39 15.1466 10.75 15.6566 10.68L17.0766 10.48C17.2766 10.45 17.5566 10.31 17.6966 10.17L21.4066 6.46C22.0466 5.82 22.3466 5.08 21.4066 4.14C20.4566 3.19 19.7166 3.49 19.0766 4.13Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.5466 4.65997C18.8666 5.78997 19.7466 6.66997 20.8666 6.97997" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className="text-sm font-medium"> Manage Restaurants </span>
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
                                <NavLink
                                    to={`/edit-restaurant`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >


                                    <span className="text-sm font-medium">Edit Restaurant</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/all-branches`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >


                                    <span className="text-sm font-medium">All Branches</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/manage-shifts`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >


                                    <span className="text-sm font-medium">Business Hours</span>
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to={`/manage-tables`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >


                                    <span className="text-sm font-medium">Manage tables</span>
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to={`/tables-reservation`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >


                                    <span className="text-sm font-medium">Table Reservation</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/manage-payment-system`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >


                                    <span className="text-sm font-medium">Bills & Payment</span>
                                </NavLink>

                            </li>
                        </ul>
                    </details>
                </li>

                {/* Promotional member */}
                <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                        >
                            <div className="flex items-center gap-2">
                                <TbSpeakerphone className="h-5 w-5 opacity-75" />


                                <span className="text-sm font-medium"> Promotionals </span>
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
                                <NavLink to={`/reels`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >
                                    Reels
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/story`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >
                                    Story
                                </NavLink>
                            </li>

                        </ul>
                    </details>
                </li>
                {/* graph  */}

                <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                        >
                            <div className="flex items-center gap-2">
                                {/* <svg
                             xmlns="http://www.w3.org/2000/svg"
                             className="h-5 w-5 opacity-75"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor"
                             strokeWidth="2"
                         >
                             <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                             />
                         </svg> */}
                                <BsGraphUpArrow className="h-5 w-5 opacity-75" viewBox="0 0 24 24" />

                                <span className="text-sm font-medium"> Statistics </span>
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
                                <NavLink
                                    to={`/statistics`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >


                                    <span className="text-sm font-medium">Graph<span className="text-[9px]">(All)</span></span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/statistics`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >


                                    <span className="text-sm font-medium">Graph<span className="text-[9px]">(selected branch)</span> </span>
                                </NavLink>
                            </li>

                        </ul>
                    </details>
                </li>



                {/* eExpenses */}
                <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                        >
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                                <span className="text-sm font-medium"> Expenses </span>
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
                                <NavLink to={`/expenses`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }>


                                    <span className="text-sm font-medium">Expenses & Salary </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/purchase`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }>


                                    <span className="text-sm font-medium">Purchase history</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/vendors`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }>


                                    <span className="text-sm font-medium">Vendor & Suppliers</span>
                                </NavLink>
                            </li>
                        </ul>
                    </details>
                </li>

                {/* customer  & employee */}
                <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                        >
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>

                                <span className="text-sm font-medium">Customers & Employee </span>
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
                                <NavLink to={`/customers`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }>


                                    <span className="text-sm font-medium">All Customers</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/all-employee-list`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }>


                                    <span className="text-sm font-medium">All Employee </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/employee-list`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }>


                                    <span className="text-sm font-medium"> Employee <span className='text-[9px]'>(selected branch)</span> </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/add-attendance`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }>


                                    <span className="text-sm font-medium">Add Attendance </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/add-employee`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }>


                                    <span className="text-sm font-medium"> Add employee</span>
                                </NavLink>
                            </li>
                        </ul>
                    </details>
                </li>

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
                                            ? "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >
                                    Category
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/dish-list`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >
                                    Dishes
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
                                <svg className='h-5 w-5 opacity-75' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0008 13.3C11.8708 13.3 11.7408 13.27 11.6208 13.2L2.79083 8.09002C2.43083 7.88002 2.31081 7.41999 2.52081 7.05999C2.73081 6.69999 3.18081 6.57997 3.55081 6.78997L12.0008 11.68L20.4008 6.82C20.7608 6.61 21.2208 6.74002 21.4308 7.09002C21.6408 7.45002 21.5108 7.90999 21.1608 8.11999L12.3908 13.2C12.2608 13.26 12.1308 13.3 12.0008 13.3Z" fill="#292D32" />
                                    <path d="M12.001 22.36C11.591 22.36 11.251 22.02 11.251 21.61V12.54C11.251 12.13 11.591 11.79 12.001 11.79C12.411 11.79 12.751 12.13 12.751 12.54V21.61C12.751 22.02 12.411 22.36 12.001 22.36Z" fill="#292D32" />
                                    <path d="M12.0011 22.75C11.1211 22.75 10.2511 22.56 9.5611 22.18L4.2211 19.21C2.7711 18.41 1.64111 16.48 1.64111 14.82V9.16998C1.64111 7.50998 2.7711 5.59002 4.2211 4.78002L9.5611 1.82C10.9311 1.06 13.0711 1.06 14.4411 1.82L19.7811 4.78997C21.2311 5.58997 22.3611 7.51999 22.3611 9.17999V14.83C22.3611 16.49 21.2311 18.41 19.7811 19.22L14.4411 22.18C13.7511 22.56 12.8811 22.75 12.0011 22.75ZM12.0011 2.74999C11.3711 2.74999 10.7511 2.88 10.2911 3.13L4.95111 6.09997C3.99111 6.63997 3.14111 8.06999 3.14111 9.17999V14.83C3.14111 15.93 3.99111 17.37 4.95111 17.91L10.2911 20.88C11.2011 21.39 12.8011 21.39 13.7111 20.88L19.0511 17.91C20.0111 17.37 20.8611 15.94 20.8611 14.83V9.17999C20.8611 8.07999 20.0111 6.63997 19.0511 6.09997L13.7111 3.13C13.2511 2.88 12.6311 2.74999 12.0011 2.74999Z" fill="#292D32" />
                                    <path d="M17.0012 13.99C16.5912 13.99 16.2512 13.65 16.2512 13.24V10.0201L7.13116 4.76007C6.77116 4.55007 6.65114 4.09005 6.86114 3.74005C7.07114 3.38005 7.52116 3.26003 7.88116 3.47003L17.3712 8.95007C17.6012 9.08007 17.7512 9.33003 17.7512 9.60003V13.2601C17.7512 13.6501 17.4112 13.99 17.0012 13.99Z" fill="#292D32" />
                                </svg>


                                <span className="text-sm font-medium"> Inventory </span>
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
                                <NavLink to={`/recipe`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >
                                    Recipe
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/inventory-report`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >
                                    Inventory Report
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
                                <NavLink to={`/membership`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >
                                    Membership
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/coupon-list`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex text-sm font-medium items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }
                                >
                                    Coupons
                                </NavLink>
                            </li>

                        </ul>
                    </details>
                </li>
            </>
        </>
    );
};

export default SuperAdminNav;