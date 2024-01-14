import React from 'react';
import ViewEmployee from './ViewEmployee';
import useProfile from '../../../Hooks/useProfile';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MyRestaurantCard from '../../Others/MyRestaurantCard/MyRestaurantCard';

const ViewAsMyProfile = () => {
    const { profile,permitted } = useProfile();
    return (
        <section >
            <ViewEmployee data={profile} title="My Profile" editable={false} />
            <div className='max-w-5xl mx-auto mt-10 md:mt-15 border border-slate-300 rounded-md p-3 '>
                <SectionTitle h1="Your Restaurants" />
                <div className='mt-10 flex flex-wrap justify-center items-center gap-3'>
                    {
                        permitted && Array.isArray(permitted) && permitted.map((data, _idx) => <MyRestaurantCard key={_idx} data={data} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default ViewAsMyProfile;