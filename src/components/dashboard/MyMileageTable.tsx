import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import {
  IMileageSemesterWithStatus,
  getMyMileageBySemester,
  getSemestersWithStatus,
} from 'src/apis/mileage';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { semesterWithStatusState } from 'src/utils/atom';
import { useQuery } from '@tanstack/react-query';

export default function MyMileageTable() {
  const [semesterWithStatus, setSemesterWithStatus] = useRecoilState(semesterWithStatusState);

  const [updatedAt, setUpdatedAt] = React.useState(0);

  const { data, dataUpdatedAt, refetch } = useQuery<IGetMyMileage>({
    queryKey: ['semestersWithStatus'],
    queryFn: async () => {
      if (semesterWithStatus.name !== '학기 미정') {
        const response = await getMyMileageBySemester(semesterWithStatus.name);

        return response.data;
      }
      return { list: [] };
    },
  });

  React.useEffect(() => {
    if (dataUpdatedAt > updatedAt) {
      setUpdatedAt(dataUpdatedAt);
    }
  }, [updatedAt, dataUpdatedAt]);

  React.useEffect(() => {
    // const asyncFetch = async () => {
    //   if (semesterWithStatus.name === '학기 미정') {
    //     return;
    //   }
    //   getMyMileageBySemester(semesterWithStatus.name).then((response) => {
    //     // setContent(response.data as IGetMyMileage);
    //   });
    // };
    // asyncFetch();
    refetch();
  }, [semesterWithStatus, refetch]);
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

  const DataGripHeaderData = [
    {
      field: 'num',
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

  function makeData(ItemNcategory: IItemsBySemester) {
    return {
      columns: DataGripHeaderData,
      rows: ItemNcategory.items.map((item, idx) => ({
        num: idx + 1,
        ...item,
      })),
    };
  }

  return (
    <Box sx={{ width: '100%', maxHeight: '700px', overflowY: 'scroll' }}>
      {data?.list.map((ItemNcategory, idx) => (
        <Box key={idx}>
          <Typography variant="h6" sx={{ color: 'gray' }}>
            {idx + 1}. {ItemNcategory.category}
          </Typography>
          <Box sx={{ height: '20px' }} />
          <DataGrid {...makeData(ItemNcategory)} />
        </Box>
      ))}
    </Box>
  );
}
