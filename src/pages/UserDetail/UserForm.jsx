import {
  Box,
  Button,
  Card,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { apiservice } from '../..';
import useInputs from '../../hooks/useInputs';

const UserForm = ({ userData, userId }) => {
  const [isform, setIsform] = useState(false);
  const [userValues, onChangeValues] = useInputs({ name: userData.name });
  const { name } = userValues;
  const handleClickUserPatch = () => {
    setIsform(!isform);
    apiservice.patchUserDataApi(userValues, userId);
  };
  return (
    <>
      <Box sx={{ my: 3, display: 'flex', justifyContent: 'flex-end' }}>
        {isform ? (
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button
              onClick={() => {
                setIsform(!isform);
              }}
              variant="outlined"
            >
              취소
            </Button>
            <Button onClick={handleClickUserPatch} variant="contained">
              완료
            </Button>
          </Box>
        ) : (
          <Button
            onClick={() => {
              setIsform(!isform);
            }}
            size="medium"
            variant="outlined"
          >
            수정하기
          </Button>
        )}
      </Box>
      <Card>
        <TableContainer component={Paper}>
          <Table sx={{ mt: 2 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 150 }}>
                  {' '}
                  <Typography sx={{ mb: 2 }} color="textPrimary" variant="body1">
                    개인 정보
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {isform ? (
                  <>
                    {' '}
                    <TableCell style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>나이</TableCell>
                    <TableCell>
                      <Input
                        size="small"
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChangeValues}
                        required
                        autoFocus
                      />{' '}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>이름</TableCell>
                    <TableCell>{name ? name : userData.name}</TableCell>
                  </>
                )}
                <TableCell style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>나이</TableCell>
                <TableCell>{userData.age}</TableCell>
                <TableCell style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>생일</TableCell>
                <TableCell>{userData.birth_date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>Email</TableCell>
                <TableCell>{userData.email}</TableCell>
                <TableCell style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>Phone</TableCell>
                <TableCell>{userData.phone_number}</TableCell>
                <TableCell style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>성별</TableCell>
                <TableCell>{userData.gender_origin}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>주소</TableCell>
                <TableCell>{userData.address}</TableCell>
                <TableCell style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>상세 주소</TableCell>
                <TableCell>{userData.detail_address}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default UserForm;
