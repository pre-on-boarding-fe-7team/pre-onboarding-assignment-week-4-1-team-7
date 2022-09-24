import { useSearchParams } from 'react-router-dom';

const useQeuryStringParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const _page = Number.parseInt(searchParams.get('_page') || 1);
  const q = searchParams.get('q');
  const broker_id = searchParams.get('broker_id');
  const is_active = searchParams.get('is_active');
  const status = searchParams.get('status');
  const setQueryString = params => {
    const entries = Object.entries({ _page, q, broker_id, is_active, status, ...params });
    const filtered = entries.filter(([, v]) => v && v !== '');
    const newParam = Object.fromEntries(filtered);
    setSearchParams(newParam);
  };

  return [{ _page, q, broker_id, is_active, status }, setQueryString];
};

export default useQeuryStringParams;
