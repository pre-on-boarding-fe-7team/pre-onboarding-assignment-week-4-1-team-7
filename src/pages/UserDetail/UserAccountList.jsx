import { TableCell, TableRow } from '@mui/material';

const UserAccountList = ({ userAccouts }) => {
  return (
    <>
      <TableRow>
        <TableCell>계좌이름 - {userAccouts.name}</TableCell>
        <TableCell>계좌 내용</TableCell>
      </TableRow>
    </>
  );
};

export default UserAccountList;
