import { Box } from '@mui/material';

interface IProps {
  name: string;
  fieldName: string;
}

export default function TypoWithEdit({ name, fieldName }: IProps) {
  return (
    <Box sx={{ fontSize: '17px', display: 'flex', gap: '20px', whiteSpace: 'nowrap' }}>
      <Box sx={{ fontWeight: 'medium' }}>{fieldName}</Box>{' '}
      <Box sx={{ fontWeight: 'medium', color: 'gray' }}>{name}</Box>
    </Box>
  );
}
