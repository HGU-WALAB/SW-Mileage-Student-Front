import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../assets/lottie/ProfileLottie2.json';

export default function ProfileLottie() {
  return (
    <Box
      sx={{
        width: '400px',
        height: '400px',
      }}
    >
      <Lottie style={{ width: '400px' }} animationData={animationData} />
    </Box>
  );
}
