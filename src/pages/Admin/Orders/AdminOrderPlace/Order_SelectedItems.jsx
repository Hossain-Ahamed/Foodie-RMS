import React, { useContext } from 'react';
import { CustomPlaceOrderContext } from './AdminOrderPlace';
import { TbCurrencyTaka } from "react-icons/tb";
import { Button } from '@nextui-org/react';
import { PlusIcon } from '../../../../components/DishCard/DishCard';
const Order_SelectedItems = () => {
    const { selectedItems,
        setSelectedItems, } = useContext(CustomPlaceOrderContext);
    
        const deleteItem = (Seletion) => {
            // Filter out the item with the given serial number
            setSelectedItems(prevItems => prevItems.filter(item => item.serial !== Seletion?.serial));
        }
        
        
        
    return (
        <>
            {
                selectedItems && Array.isArray(selectedItems) &&
                selectedItems.map((dishData,_idx) => <React.Fragment key={dishData?.dish_id + Date.now().toString()+_idx}>

                    <div className="my-2 p-2 relative w-full flex items-center bg-white border border-gray-400 rounded-lg shadow flex-row hover:bg-gray-100 cursor-pointer">
                        {/* <img className="object-cover w-24  h-16 p-3 rounded-xl max-w-full" src={dishData?.img} alt="" /> */}
                        <div className="flex flex-col justify-between p-4 leading-normal" style={{ all: 'unset' }}>
                            <h5 className="pt-2 text-xl  font-bold tracking-tight text-gray-900">{dishData?.name} </h5>
                            <div className='grid grid-cols-2 justify-between gap-2 mb-3 mt-5'>
                                <table className="w-full order-2">
                                    <tbody>
                                        <tr>
                                            <td className="text-left text-gray-500 pr-2">Base price :</td>
                                            <td className="text-right pl-2 flex items-center font-semibold text-gray-600">{dishData.basePrice}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-left text-gray-500 pr-2">Extra price :</td>
                                            <td className="text-right pl-2 flex items-center font-semibold text-gray-600">{dishData.extra}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-left text-gray-500 pr-2">VAT :</td>
                                            <td className="text-right pl-2 flex items-center font-semibold text-gray-600">{dishData.VAT}</td>
                                        </tr>
                                        <tr className='border-t'>
                                            <td className="text-left text-gray-500 pr-2">Unit Cost :</td>
                                            <td className="text-right pl-2 flex items-center font-semibold text-green-400">{(dishData.totalPrice).toFixed(1)}</td>
                                        </tr>
                                        <tr className='border-t'>
                                            <td className="text-left text-gray-500 pr-2">Total :</td>
                                            <td className="text-right pl-2 flex items-center font-semibold text-green-400">{(dishData.totalPrice*dishData?.quantity).toFixed(1)}</td>
                                        </tr>

                                    </tbody>
                                </table>
                                <div >
                                    <div className='mb-4 flex justify-start'>
                                        <p className="text-left text-blue-300 pr-2">Quantity :</p>
                                        <p className="text-right pl-2 flex items-center font-semibold text-blue-500">{dishData?.quantity}</p>
                                    </div>

                                    {
                                        dishData?.options && <> <p className='text-wrap font-medium text-gray-500'>Options :  <span className='pl-2 font-base text-gray-600'>{dishData?.options}</span> </p></>
                                    }
                                    {
                                        dishData?.addOn && Array.isArray(dishData?.addOn) && dishData?.addOn.length > 0 && <> <p className='text-wrap font-medium text-gray-500'>Add-Ons :  <span className='pl-2 font-base text-gray-600'>{dishData.addOn.join(', ')}</span> </p></>
                                    }


                                </div>

                            </div>

                        </div>
                        <div className='absolute right-5 top-1' >
                            <Button isIconOnly color="danger" variant="shadow" clas aria-label="remove" onPress={()=>deleteItem(dishData)}>
                                <MinusIcon />
                            </Button>

                        </div>
                    </div>
                </React.Fragment>)
            }

        </>
    );
};

export default Order_SelectedItems;



const MinusIcon = ({ size = 24, width, height, ...props }) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
    >
        <g
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <path d="M6 12h12" />

        </g>
    </svg>
);
