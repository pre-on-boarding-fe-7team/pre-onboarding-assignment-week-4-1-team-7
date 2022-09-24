import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../common/utils/constant';

const Login = ({ auth, token }) => {
  const emailRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  // 토큰 있다면 /users로 리다이렉트
  useEffect(() => {
    if (token.getToken()) {
      navigate(ROUTE.ACCOUNTS);
    }
  });

  const onSubmit = async event => {
    event.preventDefault();
    const email = emailRef.current.value;
    const pw = pwRef.current.value;
    await auth.signIn(email, pw);
    navigate(ROUTE.ACCOUNTS);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input ref={emailRef} type="email" placeholder="Email" required />
        <input ref={pwRef} type="password" placeholder="Password" required />
        <button>로그인</button>
      </form>
    </>
  );
};

export default Login;
