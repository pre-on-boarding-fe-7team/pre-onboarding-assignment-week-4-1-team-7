const UserAccountList = ({ userAccount }) => {
  // console.info(userAccount);
  return (
    <>
      <div>계좌이름 - {userAccount.name}</div>
      <div>계좌 내용</div>
    </>
  );
};

export default UserAccountList;
