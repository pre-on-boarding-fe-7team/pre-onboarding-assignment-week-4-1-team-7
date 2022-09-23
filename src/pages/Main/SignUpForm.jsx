import { Button, Input } from '@mui/material';
import React from 'react';
import { postSignUpApi } from '../../api/api';
import useInputs from '../../hooks/useInputs';

const SignUpForm = ({ setisSignUp }) => {
  const [userValues, onChangeValues] = useInputs({ email: '', password: '' });
  const { email, password } = userValues;
  const handleClickDoneBtn = e => {
    e.preventDefault();
    postSignUpApi({ ...userValues });
    setisSignUp(false);
  };
  return (
    <div>
      <form onSubmit={handleClickDoneBtn}>
        <Input type="email" name="email" value={email} onChange={onChangeValues} />
        <Input type="password" name="password" value={password} onChange={onChangeValues} />
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            setisSignUp(false);
          }}
        >
          취소
        </Button>
        <Button type="submit" variant="contained">
          완료
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
