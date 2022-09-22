import React, { useEffect } from 'react';
import { getAccountFetch } from '../../modules/accountSlice';
import { getUsersFetch } from '../../modules/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import broker from '../../server/brokers.json';
import getstatus from '../../server/accountStatus.json';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import styled from 'styled-components';

function Account() {
  const dispatch = useDispatch();
  const accountList = useSelector(state => state.assert.account);
  const status = useSelector(state => state.assert.status);
  const userNameList = useSelector(state => state.users.users);
  useEffect(() => {
    const getAccountList = async () => {
      await dispatch(getAccountFetch());
    };
    const getUserList = async () => {
      await dispatch(getUsersFetch());
    };
    getAccountList();
    getUserList();
  }, [dispatch]);

  //고객 이름 필터링
  const GetUserName = users => id => users.find(user => user.id === id).name;
  const UserName = GetUserName(userNameList);

  //브로커 이름 필터링
  const Brokerlist = [];
  for (const id in broker) {
    Brokerlist.push({ id, name: broker[id] });
  }
  const GetBrokerName = brokers => id => brokers.find(broker => broker.id === id).name;
  const BrokerName = GetBrokerName(Brokerlist);

  //계좌 상태 필터링
  const AccountStatus = [];
  for (const id in getstatus) {
    AccountStatus.push({ id, name: getstatus[id] });
  }
  const GetAccountStatus = getsta => id => getsta.find(statu => statu.name === id).id;
  const StatusName = GetAccountStatus(AccountStatus);
  console.info(Brokerlist);
  console.info(AccountStatus);
  return status === 'Loading' ? (
    <div>{status}</div>
  ) : (
    <Box>
      투자계좌
      <Table
        size="small"
        style={{
          border: '1px solid black',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>평가금액</TableCell>
            <TableCell>브로커명</TableCell>
            <TableCell>계좌개설일</TableCell>
            <TableCell>계좌활성화여부</TableCell>
            <TableCell>계좌번호</TableCell>
            <TableCell>계좌명</TableCell>
            <TableCell>계좌상태</TableCell>
            <TableCell>고객명 </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountList &&
            accountList.map((account, idx) => (
              <TableRow key={idx}>
                <TableCell> {account.assets}</TableCell>
                <TableCell>{BrokerName(account.broker_id)}</TableCell>
                <TableCell>{account.created_at}</TableCell>
                <TableCell>{StatusName(account.status)}</TableCell>
                <TableCell>
                  {'*'.repeat(2) + account.number.split('').slice(1, 11).join('')}
                </TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.user_id}</TableCell>
                <TableCell>{UserName(account.id)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}

const Box = styled.div`
  max-width: 1150px;
  margin: 0 auto;
`;

export default Account;
