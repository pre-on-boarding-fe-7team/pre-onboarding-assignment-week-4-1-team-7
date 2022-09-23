import {
  Box,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { patchUserDataApi } from '../../api/api';
import useInputs from '../../hooks/useInputs';
import { getAccountsThunk } from '../../modules/accountsSlice';
import UserAccountList from './UserAccountList';
const UserDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const accounts = useSelector(state => state.accounts);
  const userData = location.state.seletUserData[0];
  const userTrue = location.state.trueFalse;
  const [isform, setIsform] = useState(false);
  const [userValues, onChangeValues] = useInputs({ name: userData.name });
  const { name } = userValues;
  useEffect(() => {
    dispatch(getAccountsThunk());
  }, [dispatch]);

  const handleClickUserPatch = () => {
    setIsform(!isform);
    patchUserDataApi(userValues, userId);
  };

  const userAccouts = accounts.data?.filter(user => user.user_id === userData.id);

  if (userData && userTrue && accounts.data)
    return (
      <div>
        {isform ? (
          <>
            <Button
              onClick={() => {
                setIsform(!isform);
              }}
            >
              취소
            </Button>
            <Button onClick={handleClickUserPatch}>완료</Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setIsform(!isform);
            }}
          >
            수정하기
          </Button>
        )}

        <Box sx={{ maxWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>개인 정보</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {isform ? (
                  <TableCell>
                    <Input type="text" name="name" value={name} onChange={onChangeValues} />{' '}
                  </TableCell>
                ) : (
                  <TableCell>{userData.name}</TableCell>
                )}
                <TableCell>{userData.gender_origin}</TableCell>
                <TableCell>{userData.age}</TableCell>
                <TableCell>{userData.email}</TableCell>
                <TableCell>{userData.phone_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{userTrue.is_active ? '🟢' : '🔴'}</TableCell>
                <TableCell>{userTrue.is_staff ? '🟢' : '🔴'}</TableCell>
                <TableCell>{userData.address}</TableCell>
                <TableCell>{userData.detail_address}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ maxWidth: 800 }}>
          <Table>
            <TableHead>
              <TableCell>계좌 목록</TableCell>
            </TableHead>
            <TableBody>
              {userAccouts?.map((value, idx) => {
                return <UserAccountList key={idx} userAccouts={value} />;
              })}
            </TableBody>
          </Table>
        </Box>
      </div>
    );
};

export default UserDetail;
