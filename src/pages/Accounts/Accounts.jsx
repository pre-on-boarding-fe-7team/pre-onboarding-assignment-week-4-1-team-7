import { Box, Card, Container, Pagination } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { PAGE_LIMIT } from '../../common/utils/constant';
import Loading from '../../components/Loading/Loading';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchAccounts } from '../../modules/accountsSlice';
import AccountList from './AccountList/AccountList';

const Accounts = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.accounts);
  const [searchParams, setSearchParams] = useSearchParams();
  const _page = Number.parseInt(searchParams.get('page'));
  const q = searchParams.get('q');
  const onSearch = query => {
    setSearchParams({ page: 1, q: query });
  };
  const handleChangePage = (_, value) => {
    setSearchParams({ page: value, q });
  };

  useEffect(() => {
    dispatch(fetchAccounts({ q, _page }));
  }, [dispatch, q, _page]);

  if (loading) return <Loading />;
  if (error) return <p>에러</p>;
  if (data)
    return (
      <Container>
        <SearchBar title="계좌 목록" onSearch={onSearch} />
        <Box sx={{ mt: 3 }}>
          <Card>
            <AccountList accounts={data.data} />
            <Pagination
              count={Math.ceil(data.total / PAGE_LIMIT)}
              page={_page}
              onChange={handleChangePage}
            />
          </Card>
        </Box>
      </Container>
    );
};

export default Accounts;
