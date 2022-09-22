import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountFetch } from '../../modules/accoutsSlice';

function Account() {
  const dispatch = useDispatch();
  const datas = useSelector(state => {
    return state.getAll;
  });
  // const status = useSelector(state => {
  //   return state.getAll.status;
  // });

  useEffect(() => {
    dispatch(getAccountFetch());
  }, [dispatch]);

  return (
    <>
      {datas.map(data => {
        return <p>{data.name}</p>;
      })}
    </>
  );
}

export default Account;
