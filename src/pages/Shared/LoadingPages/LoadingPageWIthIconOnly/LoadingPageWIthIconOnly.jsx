import React from 'react';
import { ScaleLoader } from 'react-spinners'
const LoadingPageWIthIconOnly = () => {
    return (
        <div className='w-full h-full flex justify-center items-center overflow-x-hidden  z-[100] my-8'>
            <ScaleLoader size={100} color='#36d7b7' />

        </div>
    );
};

export default LoadingPageWIthIconOnly;