import { Box, Card, CardContent, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertAccountInfo, makeGetUserName } from '../../../common/utils/field.util';
import Loading from '../../../components/Loading/Loading';
import { getUsersThunk } from '../../../modules/usersSlice';

const Account = ({ data: account }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsersThunk({ id: account.user_id }));
  }, [dispatch, account.user_id]);

  if (loading) return <Loading />;
  if (error) return <p>에러</p>;
  if (data) {
    const {
      user_name,
      broker_name,
      account_number,
      account_assets,
      account_payments,
      account_created_at,
      account_updated_at,
    } = convertAccountInfo(makeGetUserName(data), account);
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>고객명</TableCell>
                  <TableCell>{user_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>브로커명</TableCell>
                  <TableCell>{broker_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>계좌번호</TableCell>
                  <TableCell>{account_number}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>평가금액</TableCell>
                  <TableCell>{account_assets}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>입금금액</TableCell>
                  <TableCell>{account_payments}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>계좌개설일</TableCell>
                  <TableCell>{account_created_at}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>정보수정일</TableCell>
                  <TableCell>{account_updated_at}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    );
  }
};

export default Account;
