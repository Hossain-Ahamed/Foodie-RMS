import { NavLink, } from 'react-router-dom';

import { PiBowlFoodBold } from "react-icons/pi";

import { IoFastFoodOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";

const KitchenStuff = () => {
    return (
        <>

            <li>

                <NavLink to={`/purchase`}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                    }

                >
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

                    <span className="text-sm font-medium">Stock</span>
                </NavLink>
            </li>



            <li>
                <NavLink to={`/ongoing-orders`}
                    className={({ isActive }) =>
                        isActive ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                    }
                >
                   <IoFastFoodOutline className='h-5 w-5 opacity-75' />
                    <span className="text-sm font-medium"> Orders </span>
                </NavLink>
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

 
        </>
    );
};

export default KitchenStuff;