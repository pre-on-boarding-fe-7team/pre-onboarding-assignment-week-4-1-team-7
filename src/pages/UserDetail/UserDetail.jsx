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
import Loading from '../../components/Loading/Loading';
import { getUserAccountThunk } from '../../modules/accountsSlice';
import { getUserDetailThunk } from '../../modules/userDetailSlice';
import UserAccountList from './UserAccountList';
import UserForm from './UserForm';

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
        <Box sx={{ mt: 3 }}>
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 150 }}>
                    <Typography style={{ margin: '20px' }} color="textPrimary" variant="body1">
                      계좌 목록
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userAccount.data.data.map(value => {
                  return (
                    <TableRow key={value.number}>
                      <TableCell>
                        <UserAccountList userAccount={value} />
                      </TableCell>
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
