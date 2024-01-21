import React from 'react'
import { useParams } from 'react-router-dom';

const useRestauarantAndBranch = () => {
  const { branchID, res_id } = useParams();
  return {res_id,branchID}
}

export default useRestauarantAndBranch
