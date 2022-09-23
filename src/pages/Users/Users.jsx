import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUsersFetch, searchUsersFetch } from '../../modules/userSlice';
import UserTable from './UserTable';

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
  const total = useSelector(state => {
    return state.users.total;
  });

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
  for (let i = 1; i <= Math.ceil((total - 1) / 10); i++) {
    pageNumbers.push(i);
  }

  const handlePage = p => {
    const clickPage = page === null ? 1 : parseInt(p);
    setSearchParams({ page: clickPage, limit });
    dispatch(getUsersFetch(p, limit));
  };

  //검색
  const inputRef = useRef();
  const handleSearch = event => {
    event.preventDefault();
    const search = inputRef.current.value;
    if (search === '') return;
    dispatch(searchUsersFetch(search));
  };

  if (status && !users) return <div>{status}</div>;
  return (
    <>
      <form onSubmit={handleSearch}>
        <input ref={inputRef} type="text" placeholder="Search..." />
        <button>검색</button>
      </form>

      <div>라라라</div>
      <UserTable users={users} />
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
