import React from 'react';
import { Helmet } from 'react-helmet-async';

const SetTitle = ({ title }) => {
    return (
        <>
            <Helmet>
                <title>{title} | RMS </title>
            </Helmet>
        </>
    );
};

export default SetTitle;