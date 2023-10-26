import { Box } from '@mui/material';

interface IProps {
  name: string;
  fieldName: string;
}

export default function TypoWithEdit({ name, fieldName }: IProps) {
  return (
    <Box sx={{ fontSize: '18px', display: 'flex', gap: '20px', minWidth: '180px' }}>
      <Box sx={{ fontWeight: 'bold' }}>{fieldName}</Box>{' '}
      <Box sx={{ fontWeight: 'bold', color: 'gray' }}>{name}</Box>
    </Box>
  );
}
