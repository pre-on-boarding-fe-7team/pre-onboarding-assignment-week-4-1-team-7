import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSettingThunk } from '../../modules/userSettingSlice';
// import findUser from '../../common/utils/findUser';

const UserList = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSetting = useSelector(state => state.userSetting);
  useEffect(() => {
    dispatch(getUserSettingThunk());
  }, [dispatch]);

  const handleClickUserName = userId => {
    const seletUserData = users.filter(users => users.id === userId);
    navigate(`/users/${userId}`, { state: { seletUserData } });
  };

  if (users && userSetting.data)
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>이름</TableCell>
                <TableCell align="right">이메일</TableCell>
                <TableCell align="right">활성화 여부</TableCell>
                <TableCell align="right">임직원 계좌 여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(value => {
                if (value.id === 101) return <></>;

                // let trueFalse = findUser(value.uuid, userSetting.data);
                return (
                  <TableRow key={value.uuid}>
                    <TableCell
                      onClick={() => {
                        handleClickUserName(value.id);
                      }}
                    >
                      {value.name}
                    </TableCell>
                    <TableCell align="right">{value.email}</TableCell>
                    {/* <TableCell align="right">{trueFalse.is_active ? '🟢' : '🔴'}</TableCell> */}
                    {/* <TableCell align="right">{trueFalse.is_staff ? '🟢' : '🔴'}</TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
};

export default UserList;
