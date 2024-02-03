import React from 'react';
import useRestauarantAndBranch from '../../../../../Hooks/useRestauarantAndBranch';
import { Tabs } from '@nextui-org/react';
import { Tab } from '@nextui-org/react';
import { Card } from '@nextui-org/react';
import { CardBody } from '@nextui-org/react';

const MembershipContainer = () => {
    const { branchID, res_id } = useRestauarantAndBranch();

    const disabledbuttons = [];


    return (
        <section className='max-w-4xl mx-auto'>
            <div className="flex w-full flex-col">
                <Tabs disabledKeys={disabledbuttons} aria-label="Disabled Options" className='w-full justify-center'>
                    <Tab key="PaymentMethod" title="Payment Method">
                        <Card>
                            <CardBody>
                               {branchID}
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab key="printingSetup" title="Printing Set up">
                        <Card>
                            <CardBody>
                               {res_id}
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab key="MyBilling" title="Billing overview">
                        <Card>
                            <CardBody>
                              d
                            </CardBody>
                        </Card>
                    </Tab>

                </Tabs>
            </div>
        </section>
    );
};

export default MembershipContainer;