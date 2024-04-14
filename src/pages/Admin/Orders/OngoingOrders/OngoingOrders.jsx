import React from 'react';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import OrderListForKitchenStuff from '../../../../components/Dashboard/OrderListForKitchenStuff/OrderListForKitchenStuff';
import OngoingOrderList from '../../../../components/Dashboard/OngoingOrderList/OngoingOrderList';

const OngoingOrders = () => {

    const {role} = useRestauarantAndBranch();

    if(role==="Kitchen Staff"){
        return <OrderListForKitchenStuff/>
    }
    if(role==="Delivery Boy"){
        return <OrderListForKitchenStuff/>
    }



    return <OngoingOrderList/>
    
};

export default OngoingOrders;