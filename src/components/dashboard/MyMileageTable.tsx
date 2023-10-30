import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { getMyMileageBySemester, getSemestersWithStatus } from 'src/apis/mileage';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { semesterState } from 'src/utils/atom';

export default function MyMileageTable() {
  const [semester, setSemester] = useRecoilState(semesterState);

  React.useEffect(() => {
    const asyncFetch = async () => {
      if (semester === '학기 미정') {
        return;
      }
      getMyMileageBySemester(semester).then((response) => {
        console.log(response);
      });
    };
    asyncFetch();
  }, [semester]);
  // const semester = useRecoilValue(semesterState);

  interface IGetMyMileage {
    list: IItemsBySemester[];
  }
  interface IItemsBySemester {
    category: string;
    status: string; // 마일리지 진행 상태
    items: IMyItem[];
  }

  interface IMyItem {
    id: number; // 번호
    itemName: string; // 항목명
    count: number; // 등록 횟수
    description: string; // 비고
  }

  const contents: IGetMyMileage = {
    list: [
      {
        category: '교과 - 전공활동',
        status: '진행중',
        items: [
          {
            id: 1,
            itemName: 'TOPCIT 성적 우수자',
            count: 1,
            description: 'TOPCIT 성적 우수자입니다.',
          },
          {
            id: 2,
            itemName: '대경권 프로그래밍 대회',
            count: 1,
            description: '대경권 프로그래밍 대회입니다.',
          },
        ],
      },
      {
        category: '교과 - 캡스톤',
        status: '완료',
        items: [
          {
            id: 3,
            itemName: '캡스톤 프로젝트',
            count: 1,
            description: '캡스톤 프로젝트입니다.',
          },
        ],
      },
    ],
  };

  const DataGripHeaderData = [
    {
      field: 'id',
      headerName: '번호',
      width: 100,
    },
    {
      field: 'itemName',
      headerName: '항목명',
      width: 200,
    },
    {
      field: 'count',
      headerName: '횟수',
      width: 100,
    },
    {
      field: 'description',
      headerName: '비고',
      width: 300,
    },
  ];

  function makeData(ItemNcategory: IItemsBySemester) {
    return {
      columns: DataGripHeaderData,
      rows: ItemNcategory.items,
    };
  }

  return (
    <Box sx={{ width: '100%', maxHeight: '700px', overflowY: 'scroll' }}>
      {contents.list.map((ItemNcategory, index) => (
        <Box key={index}>
          <Typography variant="h6" sx={{ color: 'gray' }}>
            {index + 1}. {ItemNcategory.category}
          </Typography>
          <Box sx={{ height: '20px' }} />
          <DataGrid {...makeData(ItemNcategory)} />
        </Box>
      ))}
    </Box>
  );
}
