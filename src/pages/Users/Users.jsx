import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUsersThunk } from '../../modules/usersSlice';
import UserList from './UserList';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  let limit = searchParams.get('limit');
  limit = 10;

  const users = useSelector(state => state.users);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((users.total - 1) / 10); i++) {
    pageNumbers.push(i);
  }

  const handlePage = p => {
    const clickPage = page === null ? 1 : parseInt(p);
    setSearchParams({ page: clickPage, limit });
    dispatch(getUsersThunk(p, limit));
  };

  useEffect(() => {
    const firstPage = page === null ? 1 : page;
    dispatch(getUsersThunk({ page: firstPage, limit }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  });

  if (users.loading) {
    <>loading...</>;
  }
  if (users.data)
    return (
      <>
        <UserList users={users.data} />
        <ul>
          {pageNumbers.map((p, i) => (
            <button onClick={() => handlePage(p)} key={i}>
              {p}
            </button>
          ))}
        </ul>
      </>
    );
};

export default Users;
