import React from 'react';
import CustomerService from './CustomerService';
import KitchenStuff from './KitchenStuff';
import SuperAdminNav from './SuperAdminNav';
import AdminNav from './AdminNav';
import RiderNav from './RiderNav';

const AdminSideNavChoose = ({ role }) => {

    if (role === "Admin") {
        return <AdminNav />
    } else if (role === "Customer Service") {
        return <CustomerService />
    } else if (role === "Kitchen Staff") {
        return <KitchenStuff />
    } else if (role === "Super-Admin") {
        return <SuperAdminNav />
    } else if (role === "Delivery Boy") {
        return <RiderNav/>
    } else {
        return <>null</>
    }
};

export default AdminSideNavChoose;