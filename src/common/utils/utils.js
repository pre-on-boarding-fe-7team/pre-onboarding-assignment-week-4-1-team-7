export const convertDate = date => {
  return date.split('T')[0];
};

export const spaceName = splittedName => {
  return ' ' + splittedName + ' ';
};

export const maskingName = name => {
  const mask = '*';
  const splittedName = name.split(' ');

  if (splittedName.length === 3) {
    splittedName[1] = mask.repeat(splittedName[1].length);
    splittedName[1] = spaceName(splittedName[1]);
    return splittedName;
  }

  if (splittedName.length === 2) {
    splittedName[0] = mask.repeat(splittedName[0].length);
    splittedName[0] = spaceName(splittedName[0]);
    return splittedName;
  }

  if (splittedName.length === 4) {
    splittedName[1] = mask.repeat(splittedName[1].length);
    splittedName[1] = spaceName(splittedName[1]);
    splittedName[2] = mask.repeat(splittedName[2].length);
    splittedName[2] = spaceName(splittedName[2]);
    return splittedName;
  }
};

export const dashPhoneNumber = splittedNumber => {
  return '-' + splittedNumber + '-';
};

export const maskingPhonNumber = phoneNumber => {
  const mask = '*';
  const splittedNumber = phoneNumber.split('-');
  splittedNumber[1] = mask.repeat(splittedNumber[1].length);
  splittedNumber[1] = dashPhoneNumber(splittedNumber[1]);
  return splittedNumber;
};
