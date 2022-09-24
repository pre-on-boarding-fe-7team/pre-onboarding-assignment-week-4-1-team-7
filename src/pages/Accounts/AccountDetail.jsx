import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Card, Table, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import {
  boolToIcon,
  getAccountFormat,
  getAccountStatus,
  getBrokerName,
  getCurrency,
  getDateFormat,
  makeGetUserName,
} from '../../common/utils/field.util';
import Earning from '../../components/Earning/Earning';
import { getUsersThunk } from '../../modules/usersSlice';
import { getAccountFetch } from '../../modules/accountsSlice';

import { useParams } from 'react-router-dom';
import { header } from '../../common/utils/constant';

const AccountDetail = () => {
  let { id } = useParams();
  console.info(id);
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);

  // const [{ _page, q, broker_id, is_active, status }] = useQeuryStringParams();

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccountFetch());
  }, [dispatch]);

  const matchItems = accounts.data?.data?.find(itemsdata => {
    if (itemsdata?.number === id) return true;
  });
  console.info(matchItems);
  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                {header.map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={matchItems?.number}>
                <TableCell>{makeGetUserName(matchItems?.id)}</TableCell>
                <TableCell>{getBrokerName(matchItems?.broker_id)}</TableCell>
                <TableCell>{getAccountFormat(matchItems?.broker_id, matchItems?.number)}</TableCell>
                <TableCell>{getAccountStatus(matchItems?.status)}</TableCell>
                <TableCell>{matchItems?.name}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  <Earning assets={matchItems?.assets} payments={matchItems?.payments}>
                    {getCurrency(matchItems?.assets)}
                  </Earning>
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {getCurrency(matchItems?.payments)}
                </TableCell>
                <TableCell>{boolToIcon(matchItems?.is_active)}</TableCell>
                <TableCell>{getDateFormat(matchItems?.created_at)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
};

export default AccountDetail;
