import React from 'react';
import useRestauarantAndBranch from '../../../../../Hooks/useRestauarantAndBranch';
import { Tabs } from '@nextui-org/react';
import { Tab } from '@nextui-org/react';
import { Card } from '@nextui-org/react';
import { CardBody } from '@nextui-org/react';
import MembershipRules from '../MembershipRules/MembershipRules';
import AllMembers from '../AllMembers/AllMembers';
import CouponForEligableCustomers from '../CouponForEligableCustomers/CouponForEligableCustomers';
import SectionTitle from '../../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../../Shared/SetTtitle/SetTitle';

const MembershipContainer = () => {
    const { branchID, res_id } = useRestauarantAndBranch();

    const disabledbuttons = [];


    return (
        <section className='max-w-4xl mx-auto'>
            <div className="flex w-full flex-col">
                <SetTitle title="Membership"/>
                <Tabs disabledKeys={disabledbuttons} aria-label="Disabled Options" className='w-full justify-center'>
                    <Tab key="Manage Membership" title="Manage Membership">
                        <Card>
                            <CardBody>
                                <MembershipRules />
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab key="Our Members" title="Our Members">
                        <Card>
                            <CardBody>
                                <AllMembers />
                            </CardBody>
                        </Card>
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
        </section>
    );
};

export default MembershipContainer;