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
import { maskingName, maskingPhone } from '../../common/utils/masking';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { findUser } from '../../common/utils/field.util';

const UserList = ({ users, handleClickDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSetting = useSelector(state => state.userSetting);
  useEffect(() => {
    dispatch(getUserSettingThunk());
  }, [dispatch]);
  const handleClickUserName = (userId, trueFalse) => {
    const seletUserData = users.filter(users => users.id === userId);
    navigate(`/users/${userId}`, { state: { seletUserData, trueFalse } });
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
                <TableCell align="right">성별코드</TableCell>
                <TableCell align="right">생년월일</TableCell>
                <TableCell align="right">휴대폰 번호</TableCell>
                <TableCell align="right">최근 로그인</TableCell>
                <TableCell align="right">활성화 여부</TableCell>
                <TableCell align="right">임직원 계좌 여부</TableCell>
                <TableCell align="right">가입일</TableCell>
                <TableCell align="right">삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(value => {
                if (value.id === 101) return <></>;

                let trueFalse = findUser(value.uuid, userSetting.data);

                return (
                  <TableRow key={value.id}>
                    <TableCell
                      onClick={() => {
                        handleClickUserName(value.id, trueFalse);
                      }}
                    >
                      {maskingName(value.name)}
                    </TableCell>
                    <TableCell align="right">{value.email}</TableCell>
                    <TableCell align="right">{value.gender_origin}</TableCell>
                    <TableCell align="right">{value.birth_date.slice(0, 10)}</TableCell>
                    <TableCell align="right">{maskingPhone(value.phone_number)}</TableCell>
                    <TableCell align="right">{value.last_login.slice(0, 10)}</TableCell>
                    <TableCell align="right">{trueFalse.is_active ? '🟢' : '🔴'}</TableCell>
                    <TableCell align="right">{trueFalse.is_staff ? '🟢' : '🔴'}</TableCell>
                    <TableCell align="right">{value.created_at.slice(0, 10)}</TableCell>
                    <TableCell align="right">
                      <div onClick={() => handleClickDelete(value.id)}>
                        <DeleteForeverIcon style={{ color: 'red', cursor: 'pointer' }} />
                      </div>
                    </TableCell>
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
