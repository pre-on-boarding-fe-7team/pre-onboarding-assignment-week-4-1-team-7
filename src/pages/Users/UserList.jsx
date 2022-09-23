import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import findUser from '../../common/utils/findUser';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSettingThunk } from '../../modules/userSettingSlice';

const UserList = ({ users }) => {
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
        <Table>
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
                    {value.name}
                  </TableCell>
                  <TableCell align="right">{trueFalse.is_active ? '🟢' : '🔴'}</TableCell>
                  <TableCell align="right">{trueFalse.is_staff ? '🟢' : '🔴'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
};

export default UserList;
