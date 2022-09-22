import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { boolToIcon, makeGetUserName } from '../../../common/utils/field.util';
import Loading from '../../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAccounts } from '../../../modules/accountsSlice';
import AccountPagination from '../AccountPagination';
import { getUsersFetch } from '../../../modules/userSlice';

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
  const users = useSelector(state => state.users.users);
  const getUserName = makeGetUserName(users);

  // TODO customHook ???
  const [searchParams] = useSearchParams();
  const _page = Number.parseInt(searchParams.get('page') || 1);
  const q = searchParams.get('q');
  const broker_id = searchParams.get('broker');
  const is_active = searchParams.get('active');

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAccounts({ _page, q, broker_id, is_active }));
  }, [dispatch, _page, q, broker_id, is_active]);

  if (accounts.loading) return <Loading />;
  if (accounts.error) return <p>에러</p>;
  if (accounts.data)
    return (
      <Box sx={{ mt: 3 }}>
        <Card>
          <Box>
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
