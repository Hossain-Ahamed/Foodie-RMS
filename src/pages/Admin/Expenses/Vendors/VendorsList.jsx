import React from 'react';
import VendorsRow from './VendorsRow';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import AddVendorModal from '../../../../components/Modal/AddVendorModal/AddVendorModal';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';

const VendorsList = () => {
    const {res_id, branchID} = useRestauarantAndBranch()
    const axiosSecure = useAxiosSecure()
    const { refetch, data: data = [], isLoading, error } = useQuery({
        queryKey: ['vendors', res_id, branchID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/${res_id}/branch/${branchID}/get-all-vendors`);
            return res?.data
        }
    });
    if (isLoading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }
    return (
        <div className='bg-gray-50 rounded-md h-auto'>
            <div className='container mx-auto px-4 sm:px-8 select-none'>
                <SetTitle title="Vendor List" />
                <div className='flex md:flex-row flex-col'>
                    <div className='flex-1 mb-3 md:mb-0'>
                        <SectionTitle h1='Vendor List' />
                    </div>
                    <AddVendorModal refetch={refetch} />
                </div>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                        >
                                            Vendor
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                        >
                                            Contact
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                        >
                                            Address
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{data && Array.isArray(data) && data.map((vendor, _idx) => <VendorsRow key={_idx} vendor={vendor} res_id={res_id} branchID={branchID} refetch={refetch} />)}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorsList;