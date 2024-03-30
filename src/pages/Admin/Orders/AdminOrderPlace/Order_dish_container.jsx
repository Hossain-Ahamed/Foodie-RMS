import React, { useContext, useState } from 'react';
import { CustomPlaceOrderContext } from './AdminOrderPlace';
import DishCard from '../../../../components/DishCard/DishCard';

const Order_dish_container = () => {
    const {dishesUnderCategory} = useContext(CustomPlaceOrderContext)
    return (
        <>
           <div className='flex flex-col items-start '>


                {
                    dishesUnderCategory && Array.isArray(dishesUnderCategory) && dishesUnderCategory.map(i => <React.Fragment key={i?._id}><DishCard dishData={i} /></React.Fragment>)
                }
              
            </div>

        </>
    );
};

export default Order_dish_container;