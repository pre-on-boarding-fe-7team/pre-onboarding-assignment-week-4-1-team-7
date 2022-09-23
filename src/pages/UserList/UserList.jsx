import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccountsThunk } from '../../modules/accountsSlice';
import { getUsersThunk } from '../../modules/usersSlice';
// import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';

const UserList = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.info('usersData', users.data);
  // console.info('usersLoading', users.loading);
  const handleClickUserName = idx => {
    // console.info(idx);
    navigate('/userdetail', { state: users.data[idx] });
  };
  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccountsThunk());
  }, [dispatch]);
  if (users.loading) {
    <>loading...</>;
  }
  if (users.data)
    return (
      <>
        <Table>
          <TableBody>
            {users.data.map((value, idx) => {
              return (
                <TableRow
                  onClick={() => {
                    handleClickUserName(idx);
                  }}
                  // onClick={handleClickUserName(idx)}
                  key={value.id}
                >
                  <TableCell>{value.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
};

export default UserList;
