import React, { useContext } from 'react';

import { CustomPlaceOrderContext } from './AdminOrderPlace';
import CategoryCard from '../../../../components/CatgeoryCard/CategoryCard';

const CategoryCards = ({ categories }) => {
    const {data,
        selectedItems,
        setSelectedItems,
        addItems,
        isSelected,
        setIsSelected,} = useContext(CustomPlaceOrderContext)

    return (
        <>
      
            <div className='flex flex-col items-start '>
                {
                    categories && Array.isArray(categories) && categories.map((i, _idx) => <CategoryCard key={_idx} category={i?.category}  setSelected={setIsSelected}/>)
                }

            </div>
        </>
    );
};

export default CategoryCards;