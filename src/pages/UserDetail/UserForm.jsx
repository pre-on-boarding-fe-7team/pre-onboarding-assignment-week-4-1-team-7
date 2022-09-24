import {
  Button,
  Card,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import { apiservice } from '../..';
import useInputs from '../../hooks/useInputs';

const UserForm = ({ userData, userId }) => {
  const [isform, setIsform] = useState(false);
  const [userValues, onChangeValues] = useInputs(userData.name);
  const { name } = userValues;
  console.info(name);
  const handleClickUserPatch = () => {
    setIsform(!isform);
    apiservice.patchUserDataApi(userValues, userId);
  };
  return (
    <Card>
      {isform ? (
        <>
          <Button
            onClick={() => {
              setIsform(!isform);
            }}
          >
            취소
          </Button>
          <Button onClick={handleClickUserPatch}>완료</Button>
        </>
      ) : (
        <Button
          onClick={() => {
            setIsform(!isform);
          }}
        >
          수정하기
        </Button>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>개인 정보</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {isform ? (
              <TableCell>
                <Input type="text" name="name" value={name} onChange={onChangeValues} />{' '}
              </TableCell>
            ) : (
              <TableCell>{name ? name : userData.name}</TableCell>
            )}
            <TableCell>{userData.gender_origin}</TableCell>
            <TableCell>{userData.age}</TableCell>
            <TableCell>{userData.email}</TableCell>
            <TableCell>{userData.phone_number}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{userData.address}</TableCell>
            <TableCell>{userData.detail_address}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default UserForm;
