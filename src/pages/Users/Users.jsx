import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTE } from '../../common/utils/constant';
import Loading from '../../components/Loading/Loading';
import { deleteUsersThunk, getUsersThunk, searchUsersThunk } from '../../modules/usersSlice';
import UserList from './UserList';

const Users = ({ token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  let limit = searchParams.get('limit');
  limit = 10;
  const query = searchParams.get('query');

  const users = useSelector(state => state.users);

  useEffect(() => {
    if (!token.getToken()) {
      navigate(ROUTE.LOGIN);
    }
  });

  useEffect(() => {
    const firstPage = page === null ? 1 : page;
    setSearchParams({ page: firstPage, limit });
    dispatch(getUsersThunk(page, limit));
  }, [dispatch, setSearchParams, page, limit]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((users.total - 1) / 10); i++) {
    pageNumbers.push(i);
  }

  const handlePage = p => {
    const clickPage = page === null ? 1 : parseInt(p);
    setSearchParams({ page: clickPage, limit });
    if (inputRef.current.value === '') {
      return dispatch(getUsersThunk(p, limit));
    }
    dispatch(searchUsersThunk(inputRef.current.value, p, 10));
  };

  const handleClickDelete = id => {
    dispatch(deleteUsersThunk(id));
    if (searchParams.get('query') === null) {
      dispatch(getUsersThunk(searchParams.get('page'), limit));
    } else {
      dispatch(searchUsersThunk(searchParams.get('query'), 1, 10));
    }
  };

  const inputRef = useRef();
  const handleSearch = event => {
    event.preventDefault();
    const search = inputRef.current.value;
    if (search === '') return;

    setSearchParams({ page: 1, limit: 10, query: search !== '' ? search : query });
    dispatch(searchUsersThunk(search, 1, 10));
  };
  if (users.loading) {
    return <Loading />;
  }
  return (
    <>
      <form onSubmit={handleSearch}>
        <input ref={inputRef} type="text" placeholder="Search..." />
        <button>검색</button>
      </form>

      <UserList users={users.data} handleClickDelete={handleClickDelete} />
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
