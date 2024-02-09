import React from 'react';
import { ScaleLoader } from 'react-spinners'


const TableLoading = () => {
    return (
        <div className="fixed inset-0 bg-transparent">
            <div className="absolute left-[55%] top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div role="status">
                    <ScaleLoader height={70} width={10} color='#FF0000' />
                </div>
            </div>
        </div>
    );
};

export default TableLoading;