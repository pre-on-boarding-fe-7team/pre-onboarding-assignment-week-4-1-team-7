import {
  Box,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserDetail = () => {
  const location = useLocation();
  const userData = location.state;
  const [isform, setIsform] = useState(false);
  //1. 아래에서 변경 누르면 form으로 변하게 할 useState를 위에 만든다.
  //2.
  console.info('userDetail 데이터 =', userData);
  return (
    <div>
      <Button
        onClick={() => {
          setIsform(!true);
        }}
      >
        {isform ? '변경 취소' : '변경'}
      </Button>
      <Box sx={{ maxWidth: 800 }}>
        <Table>
          <TableHead>개인 정보</TableHead>
          <TableBody>
            <TableRow>
              {isform ? <Input /> : <TableCell>{userData.name}</TableCell>}
              <TableCell>{userData.gender_origin}</TableCell>
              <TableCell>{userData.age}</TableCell>
              <TableCell>{userData.email}</TableCell>
              <TableCell>{userData.phone_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{userData.address}</TableCell>
              <TableCell>{userData.detail_address}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ maxWidth: 800 }}>
        <Table>
          <TableHead>계좌 목록</TableHead>
          <TableBody>
            <TableRow>
              <TableCell>계좌이름</TableCell>
              <TableCell>계좌 내용</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default UserDetail;
