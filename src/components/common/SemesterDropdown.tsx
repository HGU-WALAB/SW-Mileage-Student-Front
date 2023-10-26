import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IProps {
  semesters: string[];
}
export default function SemesterDropdown({ semesters }: IProps) {
  const [semester, setSemester] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSemester(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학기</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          label="학기"
          onChange={handleChange}
        >
          {semesters.map((s, index) => (
            <MenuItem key={index} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
