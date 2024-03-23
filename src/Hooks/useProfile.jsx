import React from 'react';
import useAuthProvider from './useAuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';


const useProfile = () => {

    const { user, loading } = useAuthProvider();
    const axiosSecure = useAxiosSecure();
    const { refetch , data, isLoading, error} = useQuery({
        queryKey: ['profile', user?.email],
        enabled: (!loading && (!!user)),
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-rms-employee-profile/${user?.email}`);
            // console.log("profile: ",res.data)
            return res?.data;
        },
    });
    return { profile :data, profileLoading : loading, profileRefetch : refetch, permitted: data?.permitted, profileError : error }
};

export default useProfile;