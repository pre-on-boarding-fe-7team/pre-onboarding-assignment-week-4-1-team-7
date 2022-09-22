import CheckIcon from '@mui/icons-material/Check';
// import data from '../../api/data.json';

export const boolToIcon = flag => flag && <CheckIcon />;

export const makeGetUserName = users => id => users.find(user => user.id === id).name;

export const jsonToArray = json => {
  let result = [];
  for (const key in json) {
    result.push({ key, value: json[key] });
  }
  return result;
};

// export const getBrokerName = id => data.brokers.find(broker => broker.id === id).name;

// export const getAccountStatus = id => data.accountStatus.find(statu => statu.name === id).id;

// export const getAccountFormatByBroker = (number, brokerId) =>
