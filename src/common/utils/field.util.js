import CheckIcon from '@mui/icons-material/Check';

export const boolToIcon = flag => flag && <CheckIcon />;

export const makeGetUserName = users => id => users.find(user => user.id === id).name;

export const jsonToArray = json => {
  let result = [];
  for (const key in json) {
    result.push({ key, value: json[key] });
  }
  return result;
};
