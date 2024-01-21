import React from 'react';

const Dropdown = () => {
    return (
        <div>
            <div>
                {/* <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Headliner </label> */}

                <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-3 px-4"
                >
                    <option value="">5</option>
                    <option value="JM">10</option>
                    <option value="SRV">20</option>
                    <option value="JH">30</option>
                    <option value="BBK">50</option>
                    <option value="AK">100</option>
                </select>
            </div>
        </div>
    );
};

export default Dropdown;