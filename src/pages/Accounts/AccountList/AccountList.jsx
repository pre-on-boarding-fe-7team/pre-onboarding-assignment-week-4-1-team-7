import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import {
  boolToIcon,
  getAccountFormat,
  getAccountStatus,
  getBrokerName,
  getCurrency,
  getDateFormat,
  makeGetUserName,
} from '../../../common/utils/field.util';
import Loading from '../../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAccounts } from '../../../modules/accountsSlice';
import AccountPagination from '../AccountPagination';
import { getUsersFetch } from '../../../modules/userSlice';
import Earning from '../../../components/Earning/Earning';
import useQeuryStringParams from '../../../common/hooks/useQeuryStringParams';
import { header } from '../../../common/utils/constant';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
const AccountList = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);
  const users = useSelector(state => state.users);
  const [{ _page, q, broker_id, is_active, status }] = useQeuryStringParams();
  const [searchParams] = useSearchParams();
  console.info(searchParams); // ▶ URLSearchParams {}
  console.info(accounts.data?.data[1]?.uuid);

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAccounts({ _page, q, broker_id, is_active, status }));
  }, [dispatch, _page, q, broker_id, is_active, status]);

  // TODO users.status = success
  if (accounts.loading) return <Loading />;
  if (accounts.error) return <p>에러</p>;
  if (accounts.data && users.users)
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
                {accounts.data.data.map((account, idx) => (
                  <TableRow key={account.uuid}>
                    <TableCell>{makeGetUserName(users.users)(account.id)}</TableCell>
                    <Link to={'/accounts/' + Math.floor(Math.random() * 100000)}>
                      <TableCell>{getBrokerName(account.broker_id)}</TableCell>{' '}
                    </Link>
                    <TableCell>{getAccountFormat(account.broker_id, account.number)}</TableCell>
                    <TableCell>{getAccountStatus(account.status)}</TableCell>
                    <TableCell>{account.name}</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Earning assets={account.assets} payments={account.payments}>
                        {getCurrency(account.assets)}
                      </Earning>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      {getCurrency(account.payments)}
                    </TableCell>
                    <TableCell>{boolToIcon(account.is_active)}</TableCell>
                    <TableCell>{getDateFormat(account.created_at)}</TableCell>
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
