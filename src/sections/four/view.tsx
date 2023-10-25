// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { ResponsiveRadar } from '@nivo/radar';
import { Paper } from '@mui/material';
import { IStudentInfo } from 'src/apis/Profile';
import ProfileLottie from 'src/components/profile/ProfileLottie';

// ----------------------------------------------------------------------
const data = [
  {
    taste: 'Type A',
    // chardonay: 25,
    // carmenere: 111,
    point: 73,
  },
  {
    taste: 'Type B',
    // chardonay: 88,
    // carmenere: 108,
    point: 45,
  },
  {
    taste: 'Type C',
    // chardonay: 49,
    // carmenere: 63,
    point: 34,
  },
  {
    taste: 'Type D',
    // chardonay: 109,
    // carmenere: 102,
    point: 113,
  },
  {
    taste: 'Type E',
    // chardonay: 51,
    // carmenere: 42,
    point: 98,
  },
];
export default function FourView() {
  const settings = useSettingsContext();

  const studentInfo: IStudentInfo = {
    name: '오인혁',
    sid: '21800446',
    grade: 4,
    semester: 8,
    deptname: '전산전자공학부',
    major1: '컴퓨터공학',
    major2: '컴퓨터공학',
    isEnrolled: true,
  };

  type StudentField =
    | 'name'
    | 'sid'
    | 'grade'
    | 'semester'
    | 'deptname'
    | 'major1'
    | 'major2'
    | 'isEnrolled';

  const studentFieldEng2Kor = (eng: StudentField) => {
    switch (eng) {
      case 'name':
        return '이름';
      case 'sid':
        return '학번';
      case 'grade':
        return '학년';
      case 'semester':
        return '학기';
      case 'deptname':
        return '학부';
      case 'major1':
        return '전공1';
      case 'major2':
        return '전공2';
      case 'isEnrolled':
        return '재학여부';
      default:
        return '그 외 정보';
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 학부생 프로필 </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* <Box
          sx={{
            width: '600px',
            px: 5,
          }}
        > */}
        <ProfileLottie />
        <Box
          sx={{
            mx: 5,
            // width: '400px',
            // height: '200px',
            border: 1,
            borderColor: 'lightGray',
          }}
        />
        {/* </Box> */}
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gap: '30px',
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {Object.entries(studentInfo).map(([key, value], index) => (
            <Box sx={{ fontSize: '20px', display: 'flex', gap: '20px' }} key={index}>
              <Box sx={{ fontWeight: 'bold' }}>{studentFieldEng2Kor(key as StudentField)}</Box>{' '}
              {value}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ width: '500px', height: '500px' }}>
        <ResponsiveRadar
          data={data}
          keys={['point']}
          indexBy="taste"
          valueFormat=">-.2f"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          borderColor={{ from: 'color' }}
          gridLabelOffset={36}
          dotSize={10}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          colors={{ scheme: 'nivo' }}
          blendMode="multiply"
          motionConfig="wobbly"
          legends={[
            {
              anchor: 'top-left',
              direction: 'column',
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#999',
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      </Box>
      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      />
    </Container>
  );
}
