import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { semesterWithStatusState } from 'src/utils/atom';
import { IMileageSemesterWithStatus, getSemestersWithStatus } from 'src/apis/mileage';

interface ISemesterWithStatus {
  name: string;
  status: string;
}

interface IProps {
  semestersWithStatus: ISemesterWithStatus[];
  setSemestersWithStatus: React.Dispatch<React.SetStateAction<ISemesterWithStatus[]>>;
}

export default function SemesterDropdown({ semestersWithStatus, setSemestersWithStatus }: IProps) {
  React.useEffect(() => {
    const asyncFetch = async () => {
      const res = await getSemestersWithStatus();
      console.log(res.data);
      setSemestersWithStatus([
        { name: '학기 미정', status: '진행 상태 없음' },
        ...res.data.list.map((e: IMileageSemesterWithStatus) => ({
          name: e?.name,
          status: e?.status,
        })),
      ]);
    };
    asyncFetch();
  }, [setSemestersWithStatus]);

  const [semesterWithStatus, setSemesterWithStatus] = useRecoilState(semesterWithStatusState);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedSemester = semestersWithStatus.find((s) => s?.name === event.target.value);
    console.log(selectedSemester);
    if (selectedSemester) {
      setSemesterWithStatus(selectedSemester as ISemesterWithStatus);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학기</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semesterWithStatus.name}
          label="학기"
          onChange={handleChange} // 이벤트 핸들러를 직접 전달합니다.
        >
          {semestersWithStatus?.map((s: ISemesterWithStatus, index: number) => (
            <MenuItem key={index} value={s?.name}>
              {s?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
