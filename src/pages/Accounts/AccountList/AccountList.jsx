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
import { getUsersThunk } from '../../../modules/usersSlice';
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

  const handleClickAccountNumber = accounetNumber => {
    navigate(`/accounts/${accounetNumber}`);
  };

  useEffect(() => {
    dispatch(getUsersThunk());
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
                {accounts.data.data.map((account, idx) => (
                  <TableRow key={account.uuid}>
                    <TableCell>{makeGetUserName(users.data)(account.id)}</TableCell>
                    <TableCell>{getBrokerName(account.broker_id)}</TableCell>
                    <TableCell onClick={() => handleClickAccountNumber(account.number)}>
                      {getAccountFormat(account.broker_id, account.number)}
                    </TableCell>
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
