import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../assets/lottie/ProfileLottie2.json';

export default function ProfileLottie() {
  return (
    <Box
      sx={{
        display: { md: 'block', xs: 'none' },
        width: '350px',
      }}
    >
      <Lottie animationData={animationData} />
    </Box>
  );
}
