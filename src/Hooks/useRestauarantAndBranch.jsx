import React from 'react'
import { useParams } from 'react-router-dom';

const useRestauarantAndBranch = () => {
  const { branchName, restaurantName } = useParams();
  return {branchName,restaurantName}
}

export default useRestauarantAndBranch
