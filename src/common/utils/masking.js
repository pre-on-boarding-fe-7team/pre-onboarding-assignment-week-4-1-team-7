export const maskingName = strName => {
  if (strName.length > 2) {
    const originName = strName.split('');
    originName.forEach((name, i) => {
      if (i === 0 || i === originName.length - 1) return;
      originName[i] = '*';
    });
    const joinName = originName.join();
    return joinName.replace(/,/g, '');
  } else {
    const pattern = /.$/;
    return strName.replace(pattern, '*');
  }
};

export function maskingPhone(str) {
  let originStr = str;
  let phoneStr;
  let maskingStr;

  if (originStr == null) {
    return originStr;
  }

  phoneStr = originStr.match(/\d{2,3}-\d{3,4}-\d{4}/gi);
  if (phoneStr == null) {
    return originStr;
  }

  if (/-[0-9]{3}-/.test(phoneStr)) {
    // 00-000-0000
    maskingStr = originStr
      .toString()
      .replace(phoneStr, phoneStr.toString().replace(/-[0-9]{3}-/g, '-***-'));
  } else if (/-[0-9]{4}-/.test(phoneStr)) {
    // 00-0000-0000
    maskingStr = originStr
      .toString()
      .replace(phoneStr, phoneStr.toString().replace(/-[0-9]{4}-/g, '-****-'));
  }

  return maskingStr;
}
