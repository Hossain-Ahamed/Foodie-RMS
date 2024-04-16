import React from 'react';
import TableCard from '../../../../components/TableCard/TableCard';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { Link } from 'react-router-dom'
import TableReservationModal from '../../../../components/Modal/TableReservationModal/TableReservationModal';
import { Tab, Tabs } from '@nextui-org/react';
const TableReservationCard = () => {
    const axiosSecure = useAxiosSecure();
    const disabledbuttons = [];
    const { res_id, branchID } = useRestauarantAndBranch()
    const { isLoading, error, data: data = [], refetch } = useQuery({
        queryKey: ['table-card', res_id, branchID],
        cacheTime: 0,
        queryFn: async () => {
            const res = await axiosSecure(`/admin/restaurant/${res_id}/branch/${branchID}/table-data`);
            // console.log(res.data.pending)
            return res.data;

            // return [
            //     {
            //         "table_number": 1,
            //         "numberOfPeople": 6,
            //         "status": "pending",
            //         "date": "2024-04-16",
            //         "timeSlot": "16:00",
            //         "user_name": "Farhan Hasan Nilok",
            //         "user_phone": "01902932983", 
            //         "img": "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            //         "photoURL": "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            //     },
            //     {
            //         "table_number": 2,
            //         "numberOfPeople": 4,
            //         "status": "confirmed",
            //         "date": "2024-04-16",
            //         "timeSlot": "16:00",
            //         "user_name": "Farhan Hasan Nilok",
            //         "user_phone": "01902932983",
            //         "img": "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            //         "photoURL": "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            //     },
            //     {
            //         "table_number": 3,
            //         "numberOfPeople": 3,
            //         "status": "pending",
            //         "date": "2024-04-16",
            //         "timeSlot": "16:00",
            //         "user_name": "Farhan Hasan Nilok",
            //         "user_phone": "01902932983", 
            //         "img": "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            //         "photoURL": ""
            //     },
            // ]
        }
    })
    return (
        <div>
            <SetTitle title="Table Reservation" />
            <div className='relative  mb-5'>
                <div className='flex-1'>
                    <SectionTitle h1="Table Reservation" />
                </div>
                {/* this is admin doing reservation for customer*/}
                <div className='absolute right-5 top-0'>
                    <TableReservationModal />
                </div>
            </div>
            
            <Tabs disabledKeys={disabledbuttons} aria-label="Disabled Options" className='w-full justify-center'>
                <Tab key="Pending Reservation" title="Pending Reservation">
                    <div className='flex items-center flex-wrap gap-5 mt-5'>
                        {
                            data?.pending && Array.isArray(data?.pending) && data?.pending?.map((table, _idx) => <TableCard key={_idx} table={table} refetch={refetch} />)
                        }
                    </div>
                </Tab>

                <Tab key="Approved Reservation" title="Approved Reservation">
                    <div className='flex items-center flex-wrap gap-5 mt-5'>
                        {
                            data?.confirmed&& Array.isArray(data?.confirmed) && data?.confirmed?.map((table, _idx) => <TableCard key={_idx} table={table} refetch={refetch} />)
                        }
                    </div>
                </Tab>

                {/* <Tab key="Coupon For Members" title="Coupon for Members">
                        <Card>
                            <CardBody>
                                <CouponForEligableCustomers />
                            </CardBody>
                        </Card>
                    </Tab> */}

            </Tabs>
        </div>
    );
};

export default TableReservationCard;