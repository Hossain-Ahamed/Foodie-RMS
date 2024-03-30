import React from 'react';
import useProfile from '../../../Hooks/useProfile';
import useRestauarantAndBranch from '../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../Shared/SetTtitle/SetTitle';
import LoadingPage from '../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../Shared/ErrorPage/ErrorPage';
import BranchCard from './BranchCard';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';

const AllBranches = () => {
    const axiosSecure = useAxiosSecure();
    const { res_id, setBranchAndRestaurantName } = useRestauarantAndBranch();
    const { user } = useAuthProvider();

    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['restaurantData', res_id, user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-branches-of-super-admin/${user?.email}/restaurant/${res_id}`);
            return res?.data;
        },

    });

    if (isLoading) {
        return <LoadingPage />
    }

    if (error) {
        return <ErrorPage />
    }


    return (
        <>
            <section>



                {/* cards  */}
                <div className='mt-10 md:mt-15 border border-slate-400 rounded-md p-3 '>
                    <div className='flex'>

                    <div className='w-full flex-1'>
                        <SetTitle title="All Branches" />
                        <SectionTitle h1="All Branches" />
                        
                    </div>
                    <div>
                        <Link to={`/add-new-branch`}
                            className='flex justify-center items-center gap-2 text-white font-medium  px-4 py-2 bg-green-400 rounded-md text-nowrap'>Add Branch<IoAddOutline className='text-white' />
                        </Link>
                    </div>
                            </div>
                    <div className='mt-10 flex flex-wrap justify-center items-center gap-3'>
                        {
                            data && Array.isArray(data) && data.map((data, _idx) => <BranchCard key={_idx} data={data} setBranchAndRestaurantName={setBranchAndRestaurantName}  refetch={refetch}/>)
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default AllBranches;