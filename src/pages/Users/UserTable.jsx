import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import findUser from '../../common/utils/findUser';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSettingFetch } from '../../modules/userSettingSlice';

const UserTable = ({ users }) => {
  const dispatch = useDispatch();
  const setting = useSelector(state => {
    return state.setting.setting;
  });
  const status = useSelector(state => {
    return state.setting.status;
  });

  useEffect(() => {
    dispatch(getUserSettingFetch());
  }, [dispatch]);

  if (status && !setting) return <div>{status}</div>;
  return (
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
          {users.map(user => {
            if (user.id === 101) return <></>;

            let data = findUser(user.uuid, setting);
            // console.info(data.is_active);

            return (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{data.is_active ? '🟢' : '🔴'}</TableCell>
                <TableCell align="right">{data.is_staff ? '🟢' : '🔴'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
