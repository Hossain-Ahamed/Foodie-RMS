import React from 'react';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import SectionTitle from '../../../../../components/SectionTitle/SectionTitle';
import MembershipRulesEdit from './MembershipRulesEdit';
import LoadingPage from '../../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../../Shared/ErrorPage/ErrorPage';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert2';

const MembershipRules = () => {
    const axiosSecure = useAxiosSecure();
    const { res_id } = useRestauarantAndBranch();

    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['membersData', res_id],
        queryFn: async () => {


            // let res = await axiosSecure.get(`/restaurant/${res_id}/all-member-list`);


           let res = {
                data: {
                    res_id: "uuw4woi5",
                    singleTimeMinimumOrderAmount: 50,
                    MinimumOrderAmountTillNow: 5000,
                    percentageOffer: 5,
                    MaximumLimit_in_TK: 4750,
                    rules: "Only change by Admin",

                }
            }

            return res.data;
        },

    });

    const handleChange = async (rulesData) => {

        await axiosSecure.patch(`/restaurant/${res_id}/edit-member-rules`, rulesData)
            .then(res => {


                toast.success('saved successfully')
                dataRefetch();
            }).catch(error => {
                swal.fire('Error', 'An error occurred. Please try again.', 'error');
            })
    }


    if (dataLoading) {
        return <><LoadingPage /></>
    }

    if (dataError) {
        return <ErrorPage />
    }

    return (
        <>
            <div className='w-full flex'>
                <div className='w-3/4'>

                    <SectionTitle h2="Membership Conditions" />
                </div>
                <div className='w-1/4 flex justify-end'>
                    <MembershipRulesEdit data={data} handleChange={handleChange} />
                </div>
            </div>



            <div className="w-full p-3 ">

                <div className="p-6 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-300/50">
                    <div className="flex flex-wrap pb-3 -m-3">
                        <div className="w-full  p-3 relative">
                            <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Minimum Order Amount <span className='text-sm text-gray-500'>(Single Order)</span></p>
                            <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" >{data?.singleTimeMinimumOrderAmount || "null"}</p>

                            <p className='absolute right-7 top-[3.2rem] text-xl'>৳</p>
                        </div>

                    </div>
                    <div className="flex flex-wrap pb-3 -m-3">
                        <div className="w-full  p-3 relative">
                            <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Minimum Total Order Amount <span className='text-sm text-gray-500'>(Till Now)</span></p>
                            <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" >{data?.MinimumOrderAmountTillNow || "null"}</p>

                            <p className='absolute right-7 top-[3.2rem] text-xl'>৳</p>
                        </div>

                    </div>
                    <div className="flex flex-wrap pb-3 -m-3">
                        <div className="w-full  p-3 relative">
                            <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Discount Percantage <span className='text-sm text-gray-500'>(in every Order)</span></p>
                            <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" >{data?.percentageOffer || "null"}</p>

                            <p className='absolute right-7 top-[3.2rem] text-xl'>%</p>
                        </div>

                    </div>
                    <div className="flex flex-wrap pb-3 -m-3">
                        <div className="w-full  p-3 relative">
                            <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Maximum Discount Limit <span className='text-sm text-gray-500'>(capped in Single Order)</span></p>
                            <p className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" >{data?.MaximumLimit_in_TK || "null"}</p>

                            <p className='absolute right-7 top-[3.2rem] text-xl'>৳</p>
                        </div>

                    </div>
                    <div className="flex flex-wrap pb-3 -m-3 px-4">
                        <p className="mb-1.5 font-medium text-base text-gray-800 " data-config-id="auto-txt-3-3">Conditions : </p>

                        <p className="w-full relative px-3 border border-gray-400/40 rounded-lg py-2 revert-tailwind">
                            {data?.rules.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            )) || "there are no conditions"}
                        </p>



                    </div>
                </div>
            </div>


        </>
    );
};

export default MembershipRules;