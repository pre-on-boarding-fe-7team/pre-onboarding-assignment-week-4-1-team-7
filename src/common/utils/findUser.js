const findUser = (uuid, setting) => {
  // console.info('hello');
  const found = setting.find(element => uuid === element.uuid); //요소값리턴
  // console.info(found.is_active);
  return {
    is_active: found.is_active,
    is_staff: found.is_staff,
  };
};

export default findUser;
