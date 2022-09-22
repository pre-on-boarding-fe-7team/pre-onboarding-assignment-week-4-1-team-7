import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import useAxios from '../../../common/hooks/useAxios';
import { boolToIcon, makeGetUserName } from '../../../common/utils/field.util';
import { getUsersApi } from '../../../api/api';
import Loading from '../../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAccounts } from '../../../modules/accountsSlice';
import AccountPagination from '../AccountPagination';

const header = [
  'user_name',
  'broker_name',
  'number',
  'status',
  'name',
  'assets',
  'payments',
  'is_active',
  'created_at',
];

const AccountList = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);
  const users = useAxios(getUsersApi);
  const getUserName = makeGetUserName(users.data);
  const [searchParams] = useSearchParams();
  const _page = Number.parseInt(searchParams.get('page') || 1);
  const q = searchParams.get('q');
  const broker_id = searchParams.get('broker');
  const is_active = searchParams.get('active');

  useEffect(() => {
    dispatch(fetchAccounts({ _page, q, broker_id, is_active }));
  }, [dispatch, _page, q, broker_id, is_active]);

  if (accounts.loading || users.loading) return <Loading />;
  if (accounts.error || users.error) return <p>에러</p>;
  if (accounts.data && users.data)
    return (
      <Box sx={{ mt: 3 }}>
        <Card>
          {/* // <Box sx={{ minWidth: 1050, height: 400, overflowY: 'scroll' }}> */}
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {header.map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.data.data.map(account => (
                  <TableRow key={account.uuid}>
                    <TableCell>{getUserName(account.id)}</TableCell>
                    <TableCell>{account.broker_id}</TableCell>
                    <TableCell>{account.number}</TableCell>
                    <TableCell>{account.status}</TableCell>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{account.assets}</TableCell>
                    <TableCell>{account.payments}</TableCell>
                    <TableCell>{boolToIcon(account.is_active)}</TableCell>
                    <TableCell>{account.created_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <AccountPagination total={accounts.data.total} />
        </Card>
      </Box>
    );
};

export default AccountList;
