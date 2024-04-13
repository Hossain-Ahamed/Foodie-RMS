import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomPlaceOrderContext } from './AdminOrderPlace';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';


const Admin_PlaceOrder_Search_User = () => {

    const { SelectedUser, setSelectedUser, tableNo, setTabeleNo } = useContext(CustomPlaceOrderContext);

    const { branchID, res_id } = useRestauarantAndBranch();
    const axiosSecure = useAxiosSecure();

    const { isLoading, error, data: tableList, refetch } = useQuery({
        queryKey: ['food-list', res_id, branchID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/tables`);
            // console.log(res.data)
            return res.data
        }
    })


    const [isAnnoymus, setAnnoymus] = useState(true);




    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
    const inputRef = useRef(null);
    const navigate = useNavigate();


    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (selectedUserIndex >= 0 && selectedUserIndex < searchResult.length) {
                const selectedUser = searchResult[selectedUserIndex];
                setSelectedUser(selectedUser);
                setSearchText('');
                setSearchResult(null);
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedUserIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : searchResult.length - 1
            );
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedUserIndex((prevIndex) =>
                prevIndex < searchResult.length - 1 ? prevIndex + 1 : 0
            );
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                document.getElementById('search-result') &&
                !document.getElementById('search-result').contains(event.target)
            ) {
                setSearchResult(null);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosSecure.get(`/search-user-by-phone?phone=${searchText}`);

                setSearchResult(res.data)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (searchText) {
            fetchData();
        } else {
            setSearchResult(null);
        }
    }, [searchText, axiosSecure]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setSearchText('');
        setSearchResult(null);
    };



    const handleChange = (Changedata) => {

        if (Changedata !== "anonymous") {
            setAnnoymus(false);
            setSelectedUser({ _id: "", name: '', phone: '' })
        } else {
            setAnnoymus(true);
            setSelectedUser({ _id: "null", name: 'Anonymous', phone: '000-000-000' })
        }



    };

    if (isLoading) {
        return <LoadingPage />
    }

    if (error) {
        return <ErrorPage />
    }
    return (


        <div className='w-full p-2 border border-gray-500/50 rounded'>
            <fieldset className="grid grid-cols-2 gap-4 my-2">
                <legend className="sr-only">user type</legend>

                <div>
                    <input
                        type="radio"
                        name='user-type'
                        id='anonymous'
                        value='anonymous'
                        className="peer hidden [&:checked_+_label_svg]:block"
                        onClick={() => handleChange("anonymous")}
                        defaultChecked
                    />
                    <label
                        htmlFor="anonymous"
                        className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-gray-700">Anonymous</p>
                        </div>

                    </label>
                </div>

                <div>
                    <input

                        type="radio"
                        name='user-type'
                        value='user'
                        id='user'
                        className="peer hidden [&:checked_+_label_svg]:block"
                        onClick={() => handleChange("user")}
                    />
                    <label
                        htmlFor="user"
                        className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-gray-700">Existing User</p>
                        </div>

                    </label>
                </div>
            </fieldset>
            {
                isAnnoymus || <div className="relative">
                    <form className="w-full ">
                        <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.8055 17.296C13.9424 17.296 17.296 13.9424 17.296 9.80549C17.296 5.66862 13.9424 2.31503 9.8055 2.31503C5.66863 2.31503 2.31503 5.66862 2.31503 9.80549C2.31503 13.9424 5.66863 17.296 9.8055 17.296Z"
                                    stroke="#A9A9A9"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15.0153 15.4043L17.9519 18.3333"
                                    stroke="#A9A9A9"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input className="w-full px-4 py-1.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input pl-10" placeholder="Phone Number"

                            type="search"
                            ref={inputRef}
                            value={searchText}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                            name="q"

                        />
                    </form>
                    {searchResult && (
                        <div
                            id="search-result"
                            className="absolute top-full w-full max-w-md bg-white rounded-b-xl shadow-md transform translate-y-2 z-[1000]"
                        >
                            {searchResult.map((user, index) => (
                                <div
                                    key={user._id}
                                    className={`p-2 hover:bg-slate-100 hover:cursor-pointer ${index === selectedUserIndex ? 'bg-slate-100' : ''
                                        }`}
                                    onClick={() => handleUserSelect(user)}
                                >
                                    {user.name} {user?.phone}
                                </div>
                            ))}
                        </div>
                    )}


                </div>

            }


            <div className="w-full pt-2">
                <div className="px-3 pt-2 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                    <div className="flex flex-wrap pt-3 pb-5 -m-3">

                        {/*  name  */}
                        <div className="w-full md:w-1/2 px-3 pb-1">
                            <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-4-3">Name</p>
                            <input className="w-full px-4 py-1.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="Doe"
                                value={SelectedUser?.name} readOnly />

                        </div>


                        {/* mobile  */}
                        <div className="w-full md:w-1/2 px-3 pb-1">
                            <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-6-3">mobile number</p>
                            <input className="w-full px-4 py-1.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="tel" placeholder="01x xxx xxxx "
                                value={SelectedUser?.phone} readOnly />

                        </div>





                    </div>


                </div>

                <select id="" onChange={(e) => setTabeleNo(e.target.value)} value={tableNo} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select Table </option>

                    {
                        tableList && Array.isArray(tableList) && tableList.map(i => <option value={i?.number} key={i?.number}>No : {i?.number} Capacity : {i?.capacity}</option>)
                    }

                </select>
            </div>



        </div>
    );
};

export default Admin_PlaceOrder_Search_User;

