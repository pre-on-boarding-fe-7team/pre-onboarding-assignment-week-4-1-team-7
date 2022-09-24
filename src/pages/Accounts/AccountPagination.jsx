import { Pagination } from '@mui/material';
import useQeuryStringParams from '../../common/hooks/useQeuryStringParams';
import { PAGE_LIMIT } from '../../common/utils/constant';

const AccountPagination = ({ total }) => {
  const [{ _page }, setQueryString] = useQeuryStringParams();

  const handleChangePage = (_, value) => {
    setQueryString({ _page: value });
  };

  return (
    <Pagination count={Math.ceil(total / PAGE_LIMIT)} page={_page} onChange={handleChangePage} />
  );
};

export default AccountPagination;
