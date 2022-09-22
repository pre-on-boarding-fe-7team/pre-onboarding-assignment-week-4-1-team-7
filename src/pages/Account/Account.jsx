import React, { useEffect } from 'react';
import { getAccountFetch } from '../../modules/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import broker from '../../server/brokers.json';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
function Account() {
  const dispatch = useDispatch();
  const accountList = useSelector(state => state.assert.account);
  const status = useSelector(state => state.assert.status);
  useEffect(() => {
    const getAccountList = async () => {
      await dispatch(getAccountFetch());
    };

    getAccountList();
  }, [dispatch]);

  console.info(Object.values(broker));
  // const brokerName = JSON.stringify(broker);
  // const result = JSON.parse(brokerName);

  // console.info(result);
  const list = [];
  for (const key in broker) {
    list.push(`{${key}: ${broker[key]}}`);
    // list.push(`${key}: ${border[key]}`);
    // console.info(key);
    // console.info(result[key]);
  }
  console.info(list);

  // list.filter(a => {
  //   return a['209'] === '유안타증권';
  // });
  // console.info(list);

  // const newJson = list.filter(function (element) {
  //   console.info(element['209']);
  //   return element['209'] === '유안타증권';
  // });

  // console.info(newJson);
  // const siba = list.map(a => {
  //   console.info(a);
  // });

  // const all =(account.broker_id)=>{
  //   list.map(a => {
  //     if( Object.values(a) === account.broker_id){
  //       return null
  //     }

  //   })
  // }

  return status === 'Loading' ? (
    <div>{status}</div>
  ) : (
    <>
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
            <TableCell>고객명</TableCell>
            <TableCell>계좌상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountList &&
            accountList.map((account, idx) => (
              <TableRow key={idx}>
                <TableCell> {account.assets}</TableCell>
                <TableCell>{account.broker_id}</TableCell>
                <TableCell>{account.created_at}</TableCell>
                <TableCell>{account.status === 1 ? '활성화' : '비활성화'}</TableCell>
                <TableCell>
                  {'*'.repeat(2) + account.number.split('').slice(1, 11).join('')}
                </TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.user_id}</TableCell>
                <TableCell>{account.id}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Account;
