import React from 'react';

import { Navigate } from 'react-router-dom';
import useProfile from '../../Hooks/useProfile';
import LoadingPage from '../../pages/Shared/LoadingPages/LoadingPage/LoadingPage';
import useRestauarantAndBranch from '../../Hooks/useRestauarantAndBranch';

const ProtectedByRole = ({ allowedRoles, children }) => {
    const {  profileLoading } = useProfile();
    const {role} = useRestauarantAndBranch()


    if (profileLoading) {
        return <LoadingPage />
    }

    if (allowedRoles.includes(role)) {
        return <>{children}</>
    }

    return <Navigate to="/" replace />
};

export default ProtectedByRole;