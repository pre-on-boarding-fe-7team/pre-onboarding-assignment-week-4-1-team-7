import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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
import { getUsersFetch } from '../../modules/userSlice';
import { fetchAccounts } from '../../modules/accountsSlice';
import useQeuryStringParams from '../../common/hooks/useQeuryStringParams';
import { useParams } from 'react-router-dom';
import { header } from '../../common/utils/constant';
import { useSearchParams } from 'react-router-dom';

const AccountDetail = () => {
  let { id } = useParams();
  console.info(id);
  const [searchParams] = useSearchParams();
  console.info(searchParams); // ▶ URLSearchParams {}

  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);
  const [{ _page, q, broker_id, is_active, status }] = useQeuryStringParams();
  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAccounts({ _page, q, broker_id, is_active, status }));
  }, [dispatch, _page, q, broker_id, is_active, status]);

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
              <TableRow key={accounts.data?.data[id]?.uuid}>
                <TableCell>{makeGetUserName(accounts.data?.data[id]?.id)}</TableCell>
                <TableCell>{getBrokerName(accounts.data?.data[id]?.broker_id)}</TableCell>
                <TableCell>
                  {getAccountFormat(
                    accounts.data?.data[id]?.broker_id,
                    accounts.data?.data[id]?.number
                  )}
                </TableCell>
                <TableCell>{getAccountStatus(accounts.data?.data[id]?.status)}</TableCell>
                <TableCell>{accounts.data?.data[id]?.name}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  <Earning
                    assets={accounts.data?.data[id]?.assets}
                    payments={accounts.data?.data[id]?.payments}
                  >
                    {getCurrency(accounts.data?.data[id]?.assets)}
                  </Earning>
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {getCurrency(accounts.data?.data[id]?.payments)}
                </TableCell>
                <TableCell>{boolToIcon(accounts.data?.data[id]?.is_active)}</TableCell>
                <TableCell>{getDateFormat(accounts.data?.data[id]?.created_at)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
};

export default AccountDetail;
