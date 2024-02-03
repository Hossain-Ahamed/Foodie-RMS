import React from 'react';
import SetTitle from '../../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../../components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import AddMember from './AddMember';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';

const AllMembers = () => {
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();

    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['membersData', res_id],
        enabled: true,
        cacheTime: 0,
        queryFn: async () => {


            const res = await axiosSecure.get(`/restaurant/${res_id}/all-member-list`);


            const res1 = {
                data:[
                        {
                            _id: "1",
                            displayName: "Farhan Hasan",
                            
                            email: "nilok@gmail.com",
                            
                            phoneNumber: "018399473783",
                           
                           
                            uid: "4385884935",
            
                           
                            photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                           
                        },
                        {
                            _id: "2",
                            f_name: "Fattan Prodan",
                            
                            email: "nilok@gmail.com",
                          
                            phoneNumber: "018399473783",
                           
                           
                            uid: "4385884935",
            
                            photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                       
                        },
                      
                        {
                            _id: "6",
                            f_name: "Gazi Fuad",
                            
                            email: "sodome@gmail.com",
                           
                            phoneNumber: "018399473783",
                            
                            uid: "4385884935",
            
                  
                            photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                          
                        },
                    ]
                
            }
          

            return res1?.data;
        },

    });

    return (
        <>
            <SetTitle title="All Members" />
            <div className='w-full flex'>
                <div className='w-3/4'>

                    <SectionTitle h2="All Members" />
                </div>
                <div className='w-1/4'>
                    <AddMember />
                </div>
            </div>
           
        </>
    );
};

export default AllMembers;