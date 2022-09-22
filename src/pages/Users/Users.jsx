import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUsersFetch } from '../../modules/userSlice';
import UserDetail from './UserDetail/UserDetail';

const Users = ({ token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  let limit = searchParams.get('limit');
  limit = 10;

  const users = useSelector(state => {
    return state.users.users;
  });
  const status = useSelector(state => {
    return state.users.status;
  });

  // 토큰 없다면 /login로 리다이렉트
  useEffect(() => {
    if (!token.getToken()) {
      navigate('/login');
    }
  });

  useEffect(() => {
    const firstPage = page === null ? 1 : page;
    setSearchParams({ page: firstPage, limit });
    dispatch(getUsersFetch(page, limit));
  }, [dispatch, setSearchParams, page, limit]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((users?.length * 10) / 10); i++) {
    pageNumbers.push(i);
  }

  const handlePage = p => {
    const clickPage = page === null ? 1 : parseInt(p);
    setSearchParams({ page: clickPage, limit });
    dispatch(getUsersFetch(p, limit));
  };

  if (status && !users) return <div>{status}</div>;
  return (
    <>
      <div>라라라</div>
      <ul>
        {users.map(user => (
          <UserDetail key={user.uuid + user.id} user={user} />
        ))}
      </ul>
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
