import React, { useEffect } from 'react';
import { getAccountFetch } from '../../modules/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
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

  console.info(status);
  return (
    <table
      style={{
        border: '1px solid black',
      }}
    >
      <tr>
        {accountList &&
          accountList.map((account, idx) => (
            <div key={idx}>
              <td>{account.assets}</td>
              <td>{account.broker_id}</td>
              <td>{account.created_at}</td>
              <td>{account.id}</td>
              <td>{account.is_active}</td>
              <td>{account.number}</td>
              <td>{account.name}</td>
              <td>{account.user_id}</td>
              <td>{account.status}</td>
            </div>
          ))}
      </tr>
    </table>
  );
}

export default Account;
