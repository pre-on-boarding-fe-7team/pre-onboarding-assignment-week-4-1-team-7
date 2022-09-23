const findUser = (uuid, userSetting) => {
  const found = userSetting.find(element => uuid === element.uuid); //요소값리턴
  return {
    is_active: found.is_active,
    is_staff: found.is_staff,
  };
};

export default findUser;
