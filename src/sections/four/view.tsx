// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { ResponsiveRadar } from '@nivo/radar';

// ----------------------------------------------------------------------
const data = [
  {
    taste: 'A',
    // chardonay: 25,
    // carmenere: 111,
    point: 73,
  },
  {
    taste: 'B',
    // chardonay: 88,
    // carmenere: 108,
    point: 45,
  },
  {
    taste: 'C',
    // chardonay: 49,
    // carmenere: 63,
    point: 34,
  },
  {
    taste: 'D',
    // chardonay: 109,
    // carmenere: 102,
    point: 113,
  },
  {
    taste: 'E',
    // chardonay: 51,
    // carmenere: 42,
    point: 98,
  },
];
export default function FourView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page Four </Typography>

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
