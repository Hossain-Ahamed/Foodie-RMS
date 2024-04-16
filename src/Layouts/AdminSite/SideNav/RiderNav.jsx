import React from 'react';
import { NavLink, } from 'react-router-dom';

import { PiBowlFoodBold } from "react-icons/pi";

import { IoFastFoodOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";

const RiderNav = () => {
    return (
        <>


            <li>
                <NavLink to={`/ongoing-orders`}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                    }
                >

                    <div className="flex items-center gap-2">
                        <IoFastFoodOutline className='h-5 w-5 opacity-75' />
                        <span className="text-sm font-medium">Manage Orders </span>
                    </div>
                </NavLink>
            </li>





        </>
    );
};

export default RiderNav;