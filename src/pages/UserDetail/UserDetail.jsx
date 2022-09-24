import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserAccountThunk } from '../../modules/userAccoutSlice';
import { getUserDetailThunk } from '../../modules/userDetailSlice';
import UserAccountList from './UserAccountList';
import UserForm from './UserForm';

const UserDetail = () => {
  const dispatch = useDispatch();
  const userId = useParams();
  const userAccount = useSelector(state => state.userAccount);
  const userData = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUserAccountThunk(userId.id));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getUserDetailThunk(userId.id));
  }, [dispatch, userId]);

  //1. [?] 위의 함수가 실행되면서 이름이 바뀔 때 어떻게 store 안의 값을 바꿀지...?
  //2. [?] 아래 ? 부분 너무 더러움 , 어떻게하면 깔끔하게 보일 수 있을지?
  //3. [?] 왼쪽 폴더들 보면 메인은 userDetail인데 부가적인 것들이 지저분해보임 어떻게 통일하면 좋을까?

  if (userData.loading || userAccount.loading) return <>loading</>;
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
                <TableCell>계좌 목록</TableCell>
              </TableHead>
              <TableBody>
                {userAccount.data.data.map((value, idx) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <UserAccountList key={idx} userAccount={value} />
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
