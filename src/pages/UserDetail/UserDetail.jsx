import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { convertAccountInfo } from '../../common/utils/field.util';
import Earning from '../../components/Earning/Earning';
import Loading from '../../components/Loading/Loading';
import { getUserAccountThunk } from '../../modules/accountsSlice';
import { getUserDetailThunk } from '../../modules/userDetailSlice';
import UserForm from './UserForm';

const header = [
  '브로커명',
  '계좌번호',
  '계좌상태',
  '평가금액',
  '입금금액',
  '계좌활성화여부',
  '계좌개설일',
];

const UserDetail = () => {
  const dispatch = useDispatch();
  const userId = useParams();
  const userAccount = useSelector(state => state.accounts);
  const userData = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUserAccountThunk(userId.id));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getUserDetailThunk(userId.id));
  }, [dispatch, userId]);

  if (userData.loading || userAccount.loading) return <Loading />;
  if (userData.data && userAccount.data)
    return (
      <Container>
        <Box sx={{ mt: 3 }}>
          <UserForm userData={userData.data.data} userId={userId.id} />
        </Box>
        <Box sx={{ mt: 5 }}>
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 150 }}>
                    <Typography sx={{ mt: 2, mb: 2 }} color="textPrimary" variant="body1">
                      계좌 목록
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: 30, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    계좌명
                  </TableCell>
                  {header.map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {userAccount.data.data.map(value => {
                  const {
                    broker_name,
                    account_number,
                    account_status,
                    account_assets,
                    account_payments,
                    account_active,
                    account_created_at,
                  } = convertAccountInfo(() => {}, value);
                  return (
                    <TableRow key={value.number}>
                      <TableCell>{value.name}</TableCell>
                      <TableCell>{broker_name}</TableCell>
                      <TableCell>{account_number}</TableCell>
                      <TableCell>{account_status}</TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Earning assets={value.assets} payments={value.payments}>
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
          </Card>
        </Box>
      </Container>
    );
};

export default UserDetail;
