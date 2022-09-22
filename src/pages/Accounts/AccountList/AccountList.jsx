import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import useAxios from '../../../common/hooks/useAxios';
import { boolToIcon, makeGetUserName } from '../../../common/utils/field.util';
import { getUsersApi } from '../../../api/api';
import Loading from '../../../components/Loading/Loading';

const header = [
  'user_name',
  'broker_name',
  'number',
  'status',
  'name',
  'assets',
  'payments',
  'is_active',
  'created_at',
];

const AccountList = ({ accounts }) => {
  const { data, loading, error } = useAxios(getUsersApi);
  const getUserName = makeGetUserName(data);

  if (loading) return <Loading />;
  if (error) return <p>에러</p>;
  if (data)
    return (
      // <Box sx={{ minWidth: 1050, height: 400, overflowY: 'scroll' }}>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              {header.map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(account => (
              <TableRow key={account.uuid}>
                <TableCell>{getUserName(account.id)}</TableCell>
                <TableCell>{account.broker_id}</TableCell>
                <TableCell>{account.number}</TableCell>
                <TableCell>{account.status}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.assets}</TableCell>
                <TableCell>{account.payments}</TableCell>
                <TableCell>{boolToIcon(account.is_active)}</TableCell>
                <TableCell>{account.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
};

export default AccountList;
