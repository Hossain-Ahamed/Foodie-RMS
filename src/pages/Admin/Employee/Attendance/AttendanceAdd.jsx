import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import AttendanceAdd_Row from './AttendanceAdd_Row';
import upload from "../../../../assets/images/Home/upload.svg";
import toast from 'react-hot-toast'
import { SwalErrorShow } from '../../../../assets/scripts/Utility';
const AttendanceAdd = () => {
    const axiosSecure = useAxiosSecure();
    const [value, setValue] = useState("No");
    const [attendanceData, setAttendanceData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const { branchID, res_id } = useRestauarantAndBranch();

    const location = useLocation();

    const reqURLData = {};


    const { isLoading, error, data: data = [], refetch } = useQuery({
        queryKey: ['employee-list'],
        cacheTime: 0,
        queryFn: async () => {
            const res = await axiosSecure(`/restaurant/${res_id}/branch/${branchID}/all-employee-list`);
            // console.log(res.data)
            return res.data
        }
    })

    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {
           const tempData = data.map(i => {
               const sentData = {
                  ...i,
                   user_id: i?._id,
                   status: "No"
               }
               return sentData

        })
        setAttendanceData(tempData)
        }
    }, [data])
    if (isLoading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }
    // change the attendence dropdown
    const handleSelectionChange = (e, id) => {
        setValue(e.target.value);
        const temp = attendanceData.map(item => {
            if (item._id === id) {
                return { ...item, status: e.target.value };
            }
            return item;
        });
        setAttendanceData(temp)
        // const selection = e.target.value;
        // const currentDate = new Date();
        // const isoDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0, 0);

        // const data = {
        //     date: isoDate.toISOString()
        // };

        // if (selection === "Yes") {
        //     data.status = true;
        // } else {
        //     data.status = false;
        // }

        // axiosSecure.patch(`/restaurant/${res_id}/branch/${branchID}/modify-attendance/${employee?._id}`, data)
        //     .then(res => toast.success('Changed Successfully'))
        //     .catch(e => toast.error('Error !Try Again'))
    };
    // it will upload data
const handleAttendenceSave = () => {
    axiosSecure.post(`/admin/restaurant/${res_id}/branch/${branchID}/upload-attendence`, {attendanceData})
    .then(res => toast.success("Attendence Uploaded"))
    .catch(err => SwalErrorShow(err))
}
    return (
        <section className='max-w-[1600px] mx-auto mt-5'>
            <SetTitle title="Attendance" />

            <div className='flex  gap-3 '>
                <div className='w-full '>
                    <SectionTitle h1="Attendance" />
                </div>

                <button onClick={handleAttendenceSave} className='flex justify-center items-center gap-2 text-white font-medium px-4 py-1.5 bg-green-400 rounded-md text-nowrap'>Upload <img src={upload} alt="" /></button>
            </div>

            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        {
                            isLoading ? <LoadingPage />
                                :
                                <>
                                    <table className='min-w-full leading-normal'>
                                        <thead>
                                            <tr>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-left'
                                                >
                                                    Employee {value}
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                                >Branch</th>

                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
                                                >
                                                    mobile
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                                >
                                                    Role
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                                >
                                                    Attendance
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{attendanceData && Array.isArray(attendanceData) && attendanceData.map((employee, _idx) =>
                                            <AttendanceAdd_Row
                                                key={_idx}
                                                handleSelectionChange={handleSelectionChange}
                                                employee={employee}
                                                axiosSecure={axiosSecure}
                                                refetch={refetch}
                                            />)}</tbody>
                                    </table>
                                </>
                        }

                    </div>
                </div>

            </div>
        </section>
    );
};

export default AttendanceAdd;