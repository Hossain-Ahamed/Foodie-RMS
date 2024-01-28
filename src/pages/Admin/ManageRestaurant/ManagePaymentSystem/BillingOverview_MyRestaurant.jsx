import React from 'react';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
const BillingOverview_MyRestaurant = () => {
    return (
        <section>
            <SetTitle title="Billing Overview" />
            <Tabs  aria-label="Disabled Options" className='w-full justify-center'>
                <Tab key="billingHistory" title="Billing History">
                    kdjasfjdsjaflskjsdalkf
                </Tab>
                <Tab key="Subscriptions" title="Subscriptions">
                    dasflkkdasjkfjldksafjlfdjsl
                </Tab>
            </Tabs>
        </section>
    );
};

export default BillingOverview_MyRestaurant;