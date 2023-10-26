import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  PiNumberOneLight,
  PiNumberTwoLight,
  PiNumberThreeLight,
  PiNumberFourLight,
  PiNumberFiveLight,
  PiNumberSixLight,
  PiNumberSevenLight,
  PiNumberEightLight,
  PiNumberNineLight,
} from 'react-icons/pi';
import { dateConverter } from 'src/utils/converter/dateConverter';
import { Typography } from '@mui/material';

const IconList = (idx: number) => {
  switch ((idx % 10) + 1) {
    case 1:
      return <PiNumberOneLight style={{ fontSize: '20px' }} />;
    case 2:
      return <PiNumberTwoLight style={{ fontSize: '20px' }} />;
    case 3:
      return <PiNumberThreeLight style={{ fontSize: '20px' }} />;
    case 4:
      return <PiNumberFourLight style={{ fontSize: '20px' }} />;
    case 5:
      return <PiNumberFiveLight style={{ fontSize: '20px' }} />;
    case 6:
      return <PiNumberSixLight style={{ fontSize: '20px' }} />;
    case 7:
      return <PiNumberSevenLight style={{ fontSize: '20px' }} />;
    case 8:
      return <PiNumberEightLight style={{ fontSize: '20px' }} />;
    case 9:
      return <PiNumberNineLight style={{ fontSize: '20px' }} />;
    default:
      return <PiNumberOneLight style={{ fontSize: '20px' }} />;
  }
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type IStatus = '선정 완료' | '신청 완료' | '신청 가능' | '신청 기간 아님';

function createData(
  id: React.ReactNode,
  semester: string,
  applyStart: string,
  applyEnd: string,
  status: IStatus
) {
  return { id, semester, applyStart, applyEnd, status };
}

interface IGetMileageApplyRecords {
  list: IMileageApplyRecord[];
}

interface IMileageApplyRecord {
  semester: string;
  status: string;
  applyStart: string;
  applyEnd: string;
}

const data: IGetMileageApplyRecords = {
  list: [
    {
      semester: '2022-01',
      status: '신청 완료',
      applyStart: '2021-09-01T00:00',
      applyEnd: '2021-09-30T00:00',
    },
    {
      semester: '2022-02',
      status: '신청 가능',
      applyStart: '2021-09-01T00:00',
      applyEnd: '2021-09-30T00:00',
    },
  ],
};

const makeData = (applyRecords: IGetMileageApplyRecords) => {
  const result = applyRecords.list.map((item, idx: number) =>
    createData(IconList(idx), item.semester, item.applyStart, item.applyEnd, item.status as IStatus)
  );
  return result;
};

const rows = makeData(data);

export default function BeforeApply() {
  return (
    <TableContainer sx={{ width: '700px' }} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow color="primary">
            <StyledTableCell>번호</StyledTableCell>
            <StyledTableCell align="right">학기</StyledTableCell>
            <StyledTableCell align="right">신청 시작일</StyledTableCell>
            <StyledTableCell align="right">신청 마감일</StyledTableCell>
            <StyledTableCell align="right">상태</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <StyledTableRow sx={{ backgroundColor: '#EEEEEE' }} key={idx}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">
                {' '}
                <Typography color="primary" variant="body1" fontWeight={600}>
                  {row.semester}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">{dateConverter(row.applyStart)}</StyledTableCell>
              <StyledTableCell align="right">{dateConverter(row.applyEnd)}</StyledTableCell>
              <StyledTableCell align="right">
                <Typography color="primary" variant="body1" fontWeight={600}>
                  {row.status}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
