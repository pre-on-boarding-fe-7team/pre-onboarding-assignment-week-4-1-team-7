import { Button, Input } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../api/api';
import useInputs from '../../hooks/useInputs';

const LoginForm = ({ setisSignUp }) => {
  const navigate = useNavigate();
  const [userValues, onChangeValues] = useInputs({ email: '', password: '' });
  const { email, password } = userValues;
  console.info({ ...userValues });
  const handleSubmitLogin = e => {
    e.preventDefault();
    postLogin({ ...userValues }).then(res => {
      navigate('/userlist');
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmitLogin}>
        <Input type="email" name="email" value={email} onChange={onChangeValues} />
        <Input type="password" name="password" value={password} onChange={onChangeValues} />
        <Button type="submit" variant="contained">
          로그인
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            setisSignUp(true);
          }}
        >
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
