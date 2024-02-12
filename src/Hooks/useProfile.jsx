import React from 'react';
import useAuthProvider from './useAuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';


const useProfile = () => {

    const { user, loading } = useAuthProvider();
    const axiosSecure = useAxiosSecure();
    const { refetch : profileRefetch, data: profile = {}, isLoading: profileLoading, error :profileError} = useQuery({
        queryKey: ['profile', user?.email],
        enabled: (!loading && (!!user)),
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-rms-employee-profile/${user?.email}`);
            console.log("profile: ",res.data)
            return res?.data;

         
            
            

        },
    });
    return { profile, profileLoading, profileRefetch, permitted: profile?.permitted, profileError }
   

};

export default useProfile;