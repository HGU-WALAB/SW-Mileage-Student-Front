// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { ResponsiveRadar } from '@nivo/radar';
import { Button, Paper, TextField } from '@mui/material';
import { IStudentInfo } from 'src/apis/Profile';
import ProfileLottie from 'src/components/profile/ProfileLottie';
import FunctionButton from 'src/components/common/FunctionButton';
import CancelButton from 'src/components/common/CancelButton';
import { Controller, useForm } from 'react-hook-form';
import ProfileEditCancelButton from 'src/components/profile/ProfileEditCancelButton';
import React from 'react';
import TypoWithEdit from 'src/components/profile/TypoWithEdit';
import { Title } from 'src/css/styled-components/Title';
import { Layout } from 'src/css/styled-components/Layout';

// ----------------------------------------------------------------------
const data = [
  {
    taste: 'Type A',
    // chardonay: 25,
    max: 111,
    point: 73,
  },
  {
    taste: 'Type B',
    // chardonay: 88,
    max: 108,
    point: 45,
  },
  {
    taste: 'Type C',
    // chardonay: 49,
    max: 63,
    point: 34,
  },
  {
    taste: 'Type D',
    // chardonay: 109,
    max: 102,
    point: 113,
  },
  {
    taste: 'Type E',
    // chardonay: 51,
    max: 100,
    point: 98,
  },
];
export default function FourView() {
  const settings = useSettingsContext();

  const studentInfo: IStudentInfo = {
    name: '오인혁',
    sid: '21800446',
    year: 4,
    semesterCount: 8,
    department: '전산전자공학부',
    major1: '컴퓨터공학',
    major2: '컴퓨터공학',
    isEnrolled: '재학 중',
  };

  type StudentField =
    | 'name'
    | 'sid'
    | 'year'
    | 'semesterCount'
    | 'department'
    | 'major1'
    | 'major2'
    | 'isEnrolled';

  const studentFieldEng2Kor = (eng: StudentField) => {
    switch (eng) {
      case 'name':
        return '이름';
      case 'sid':
        return '학번';
      case 'year':
        return '학년';
      case 'semesterCount':
        return '학기';
      case 'department':
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

  // const {
  //   isLoading: getUserLoading,
  //   data,
  //   refetch,
  // } = useQuery<IStudentInfo>(['User', 'me'], readOneMember, {
  //   onSuccess: async (data) => {
  //     setValue('name', data.name);
  //     setValue('sid', data.sid);
  //     setValue('grade', data.grade);
  //     setValue('semester', data.semester);
  //     setValue('deptname', data.deptname);
  //     setValue('major1', data.major1);
  //     setValue('major2', data.major2);
  //     setValue('isEnrolled', data.isEnrolled);
  //   },
  // });

  // const { handleSubmit, watch, setValue, getValues, control } = useForm({
  //   defaultValues: {
  //     name: '오인혁',
  //     sid: '21800446',
  //     year: '4',
  //     semesterCount: '8',
  //     department: '전산전자공학부',
  //     major1: '컴퓨터공학',
  //     major2: '컴퓨터공학',
  //     isEnrolled: 'true',
  //   },
  // });

  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Layout>
        <Title> 학부생 프로필 </Title>

        <Box
          sx={{
            width: 1,
            height: 400,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: '30px',
              gap: '30px',
            }}
          >
            <ProfileLottie />

            <Box
              sx={{
                maxWidth: '500px',
                display: 'grid',
                gap: '30px',
                gridTemplateColumns: 'repeat(2, 1fr)',
              }}
            >
              {Object.entries(studentInfo).map(([key, value], index) => (
                <TypoWithEdit
                  key={index}
                  name={value}
                  fieldName={studentFieldEng2Kor(key as StudentField)}
                />
              ))}

              {/* <TypoWithEdit name="21800446" fieldName="학번" />
            <TypoWithEdit name="4학년" fieldName="학년" />
            <TypoWithEdit name="8학기" fieldName="학기" />
            <TypoWithEdit name="전산전자공학부" fieldName="학부" />
            <TypoWithEdit name="컴퓨터공학" fieldName="전공1" />
            <TypoWithEdit name="컴퓨터공학" fieldName="전공2" />
            <TypoWithEdit name="재학 중" fieldName="재학여부" /> */}
              {/* {Object.entries(studentInfo).map(([key, value], index) => (
              <Box
                sx={{ fontSize: '18px', display: 'flex', gap: '20px', minWidth: '180px' }}
                key={index}
              >
                <Box sx={{ fontWeight: 'bold' }}>{studentFieldEng2Kor(key as StudentField)}</Box>{' '}
                <Box sx={{ fontWeight: 'bold', color: 'gray' }}>{value}</Box>
              </Box>
            ))} */}
            </Box>
          </Box>

          {/* <ProfileEditCancelButton isEditing={isEditing} setIsEditing={setIsEditing} /> */}
        </Box>

        <Box sx={{ width: '500px', height: '500px' }}>
          <ResponsiveRadar
            data={data}
            keys={['point', 'max']}
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
      </Layout>
    </Container>
  );
}
