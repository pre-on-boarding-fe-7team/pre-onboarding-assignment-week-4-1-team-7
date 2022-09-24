import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Card, Table, TableCell, TableRow, TableBody } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { styled } from '@material-ui/core/styles';
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
// import { header } from '../../common/utils/constant';
const AccountDetail = () => {
  let { id } = useParams();
  console.info(id);
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);
  const users = useSelector(state => state.users);
  // const [{ _page, q, broker_id, is_active, status }] = useQeuryStringParams();

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    const getAccountList = async () => {
      await dispatch(getAccountFetch());
    };
    getAccountList();
  }, [dispatch]);

  const matchItems = accounts?.data?.data?.find(itemsdata => {
    if (itemsdata?.number === id) return true;
  });
  console.info(matchItems);
  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <Box>
          <Tables>
            <TableBodys>
              <TableRows>
                <TableLeft>고객명</TableLeft>
                <TableCells>{makeGetUserName(users?.data)(matchItems?.id)}</TableCells>
                <TableLeft>브로커명</TableLeft>
                <TableCells>{getBrokerName(matchItems?.broker_id)}</TableCells>
              </TableRows>
              <TableRows>
                <TableLeft>계좌번호</TableLeft>
                <TableCells>
                  {getAccountFormat(matchItems?.broker_id, matchItems?.number)}
                </TableCells>
                <TableLeft>계좌상태</TableLeft>
                <TableCells>{getAccountStatus(matchItems?.status)}</TableCells>
              </TableRows>
              <TableRows>
                <TableLeft>계좌명</TableLeft>
                <TableCells>{matchItems?.name}</TableCells>
                <TableLeft>평가금액</TableLeft>
                <TableCells sx={{ textAlign: 'right' }}>
                  <Earning assets={matchItems?.assets} payments={matchItems?.payments}>
                    {getCurrency(matchItems?.assets)}
                  </Earning>
                </TableCells>
              </TableRows>
              <TableRows>
                <TableLeft>입금금액</TableLeft>
                <TableCells sx={{ textAlign: 'right' }}>
                  {getCurrency(matchItems?.payments)}
                </TableCells>
                <TableLeft>계좌활성화 여부</TableLeft>
                <TableCells>{boolToIcon(matchItems?.is_active)}</TableCells>
              </TableRows>
              <TableRows>
                <TableLeft>계좌개설일</TableLeft>
                <TableCells>{getDateFormat(matchItems?.created_at)}</TableCells>
              </TableRows>
            </TableBodys>
          </Tables>
        </Box>
      </Card>
    </Box>
  );
};
const Tables = styled(Table)`
  max-width: 1000px;

  border-spacing: 1px;
  margin: 0 auto;
  margin-bottom: 100px;
  border: 2px solid grey;
`;

const TableBodys = styled(TableBody)`
  border: 1px solid grey;
`;
const TableRows = styled(TableRow)`
  border: 1px solid grey;
`;
const TableCells = styled(TableCell)`
  border: 1px solid grey;
`;

const TableLeft = styled(TableCell)`
  background-color: #eee;
  border: 1px solid grey;
`;

export default AccountDetail;
