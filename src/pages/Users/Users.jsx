import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFetch } from '../../modules/userSlice';
import UserDetail from './UserDetail/UserDetail';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => {
    return state.users.users;
  });
  const status = useSelector(state => {
    return state.users.status;
  });

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  if (status && !users) return <div>{status}</div>;
  return (
    <ul>
      {users.map(user => (
        <UserDetail key={user.uuid + user.id} user={user} />
      ))}
    </ul>
  );
};

export default Users;
