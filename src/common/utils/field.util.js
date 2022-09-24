import CheckIcon from '@mui/icons-material/Check';
import data from '../../api/data.json';

export const getBrokers = () => data.brokers;
export const getStatus = () => data.accountStatus;

export const boolToIcon = flag => flag && <CheckIcon />;

export const makeGetUserName = users => id => users.find(user => user.id === id).name;

export const jsonToArray = json => Object.entries(json).map(([key, value]) => ({ key, value }));

export const getBrokerName = id => (id ? getBrokers()[id] : '');

export const getAccountStatus = accountStatus => {
  if (!accountStatus) return '';
  const toNumberaccountStatus = Number.parseInt(accountStatus);
  return jsonToArray(getStatus()).find(status => status.value === toNumberaccountStatus).key;
};

export const getAccountFormat = (brokerId, number) => {
  if (!brokerId || !number) return;

  const maskedNumber = maskAccountNumber(number);
  const splitedMaskedNumber = maskedNumber.split('').reverse();
  const format = data.brokerFormat[brokerId];
  return format
    .split('')
    .map(value => {
      if (value === '-') return value;
      return splitedMaskedNumber.pop();
    })
    .join('');
};

export const maskAccountNumber = number => {
  if (!number) return '';

  const first2Digits = number.slice(0, 2);
  const last2Digits = number.slice(-2);
  const asterisk = number.substring(2, number.length - 2).replace(/[0-9]/g, '*');
  return `${first2Digits}${asterisk}${last2Digits}`;
};

const format2Digits = number => number.toString().padStart(2, '0');
export const getDateFormat = date => {
  if (!date) return '';

  const convertedDate = new Date(date);
  return `${convertedDate.getFullYear()}-${format2Digits(
    convertedDate.getMonth() + 1
  )}-${format2Digits(convertedDate.getDate())}`;
};

export const getCurrency = number =>
  number
    ? new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number)
    : '';

export const convertAccountInfo = (
  getUserName,
  { user_id, broker_id, number, status, assets, payments, is_active, created_at, updated_at }
) => ({
  user_name: getUserName(user_id),
  broker_name: getBrokerName(broker_id),
  account_number: getAccountFormat(broker_id, number),
  account_status: getAccountStatus(status),
  account_assets: getCurrency(assets),
  account_payments: getCurrency(payments),
  account_active: boolToIcon(is_active),
  account_created_at: getDateFormat(created_at),
  account_updated_at: getDateFormat(updated_at),
});

export const findUser = (uuid, userSetting) => {
  const found = userSetting.find(element => uuid === element.uuid); //요소값리턴
  // console.info(found.is_active);
  return {
    is_active: found.is_active,
    is_staff: found.is_staff,
  };
};
