import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { convertAccountInfo, makeGetUserName } from '../../../common/utils/field.util';
import Loading from '../../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAccounts } from '../../../modules/accountsSlice';
import AccountPagination from '../AccountPagination';
import { getAllUsersThunk } from '../../../modules/usersSlice';
import Earning from '../../../components/Earning/Earning';
import useQeuryStringParams from '../../../common/hooks/useQeuryStringParams';
import { useNavigate } from 'react-router-dom';

const header = [
  '고객명',
  '브로커명',
  '계좌번호',
  '계좌상태',
  '계좌명',
  '평가금액',
  '입금금액',
  '계좌활성화여부',
  '계좌개설일',
];

const AccountList = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);
  const users = useSelector(state => state.users);
  const [{ _page, q, broker_id, is_active, status }] = useQeuryStringParams();
  const navigate = useNavigate();

  // accounts.id가 고유하지 않아서 accounts.uuid로 대체
  const accountClickHandler = uuid => {
    navigate(`/account/${uuid}`);
  };

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAccounts({ _page, q, broker_id, is_active, status }));
  }, [dispatch, _page, q, broker_id, is_active, status]);

  if (accounts.loading || users.loading) return <Loading />;
  if (accounts.error || users.error) return <p>에러</p>;
  if (accounts.data && users.data)
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
                {accounts.data.data.map(account => {
                  const {
                    user_name,
                    broker_name,
                    account_number,
                    account_status,
                    account_assets,
                    account_payments,
                    account_active,
                    account_created_at,
                  } = convertAccountInfo(makeGetUserName(users.data.data), account);
                  return (
                    <TableRow key={account.uuid}>
                      <TableCell>{user_name}</TableCell>
                      <TableCell>{broker_name}</TableCell>
                      <TableCell onClick={() => accountClickHandler(account.uuid)}>
                        {account_number}
                      </TableCell>
                      <TableCell>{account_status}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Earning assets={account.assets} payments={account.payments}>
                          {account_assets}
                        </Earning>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>{account_payments}</TableCell>
                      <TableCell>{account_active}</TableCell>
                      <TableCell>{account_created_at}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
          <AccountPagination total={accounts.data.total} />
        </Card>
      </Box>
    );
};

export default AccountList;
