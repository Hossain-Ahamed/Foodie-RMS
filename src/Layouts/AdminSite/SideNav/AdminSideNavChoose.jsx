import React from 'react';
import CustomerService from './CustomerService';
import KitchenStuff from './KitchenStuff';
import SuperAdminNav from './SuperAdminNav';
import AdminNav from './AdminNav';

const AdminSideNavChoose = ({ role }) => {

    if (role === "Admin") {
        return <AdminNav />
    } else if (role === "Customer Service") {
        return <CustomerService />
    } else if (role === "Kitchen Stuff") {
        return <KitchenStuff />
    } else if (role === "Super-Admin") {
        return <SuperAdminNav />
    } else if (role === "Rider") {
        return <>rider nav</>
    } else {
        return <>null</>
    }
};

export default AdminSideNavChoose;