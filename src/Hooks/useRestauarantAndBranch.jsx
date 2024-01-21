import React from 'react'
import { useParams } from 'react-router-dom';
import useProfile from './useProfile';

const useRestauarantAndBranch = () => {
  const { branchID, res_id } = useParams();
  const { permitted } = useProfile();

  const matchingPermission = permitted.find(permission => permission.branchID === branchID && permission.res_id === res_id);


  return {
    res_id,
    branchID,
    res_img: matchingPermission?.res_img,
    res_name: matchingPermission?.res_name,
    branch_name : matchingPermission?.branch_name,
    role : matchingPermission?.role
  }
}

export default useRestauarantAndBranch
