import { Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { PAGE_LIMIT } from '../../common/utils/constant';

const AccountPagination = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number.parseInt(searchParams.get('page') || 1);
  const q = searchParams.get('q');
  const broker_id = searchParams.get('broker');
  const is_active = searchParams.get('active');
  const handleChangePage = (_, value) => {
    setSearchParams({ page: value, q, broker_id, is_active });
  };

  return (
    <Pagination count={Math.ceil(total / PAGE_LIMIT)} page={page} onChange={handleChangePage} />
  );
};

export default AccountPagination;
