import React, { useEffect } from 'react';
import { getUsersFetch } from '../../modules/userSlice';
import { useDispatch } from 'react-redux';
function Account() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  return <div></div>;
}

export default Account;
