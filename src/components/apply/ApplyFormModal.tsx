import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { IsShowStudentApplyModalState } from 'src/utils/atom';
import { Chip, styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { postMileageApply } from 'src/apis/mileage';
import CancelButton from '../common/CancelButton';

const Title = styled(Chip)({
  fontSize: '25px',
  padding: '20px',
  borderRadius: '5px',
});

const MileageEA = styled(Chip)({
  fontSize: '15px',
  padding: '15px 5px',

  borderRadius: '5px',
});

const FlexCenterBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const FlexEndBox = styled(Box)({
  display: 'flex',
  justifyContent: 'end',
});

const MileageContainer = styled(Box)({
  height: '100%',
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
});

const MileageBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const MileageTitle = styled(Typography)({
  color: 'gray',
});

const SizedBox = styled(Box)({
  height: '20px',
});

interface IGetThisSemesterItem {
  count: number;
  list: IThisSemesterItemWithCategory[];
}

interface IThisSemesterItemWithCategory {
  category: string;
  items: IItem[];
}

interface IItem {
  id: number; // 번호
  itemName: string; // 항목명
  description: string; // 비고
  isRegistered: boolean;
}

const contents: IGetThisSemesterItem = {
  count: 3,
  list: [
    {
      category: '교과 - 전공활동',
      items: [
        {
          id: 1,
          itemName: 'TOPCIT 성적 우수자',
          description: 'TOPCIT 성적 우수자입니다.',
          isRegistered: true,
        },
        {
          id: 2,
          itemName: '대경권 프로그래밍 대회',
          description: '대경권 프로그래밍 대회입니다.',
          isRegistered: false,
        },
      ],
    },
    {
      category: '교과 - 캡스톤',
      items: [
        {
          id: 3,
          itemName: '캡스톤 프로젝트',
          description: '캡스톤 프로젝트입니다.',
          isRegistered: true,
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
    width: 300,
  },

  {
    field: 'description',
    headerName: '비고',
    width: 300,
  },
  {
    field: 'isRegistered',
    headerName: '등록 여부',
    width: 100,
  },
];

function makeData(ItemNcategory: IThisSemesterItemWithCategory) {
  return {
    columns: DataGripHeaderData,
    rows: ItemNcategory.items,
  };
}

const ButtonBox = styled(Box)({
  minWidth: '800px',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center',
});

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  gap: '30px',
  overflowY: 'scroll',
};

interface IProps {
  thisSemesterItemNum: number;
  data: IGetThisSemesterItem;
}

interface IItem {
  id: number; // 번호
  itemName: string; // 항목명
  description: string; // 비고
  isRegistered: boolean;
}

function countRegisteredItems(items: IItem[]) {
  const registeredItems = items.filter((item) => item.isRegistered === true);
  return registeredItems.length;
}

export default function ApplyFormModal({ thisSemesterItemNum, data }: IProps) {
  console.log(data);
  const [isShowApplyModal, setIsShowApplyModal] = useRecoilState(IsShowStudentApplyModalState);
  const handleClose = () => setIsShowApplyModal(false);

  const handleApply = async () => {
    if (window.confirm('마일리지 신청 하시겠습니까?')) {
      await postMileageApply();
      await alert('마일리지 신청이 완료되었습니다.');
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={isShowApplyModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FlexCenterBox>
            <Title label="마일리지 리스트" size="medium" color="primary" />
          </FlexCenterBox>
          <FlexEndBox>
            <MileageEA
              color="primary"
              variant="soft"
              label={`등록된 마일리지 총 갯수 : ${thisSemesterItemNum}개`}
            />
          </FlexEndBox>

          <MileageContainer>
            {data?.list.map((ItemNcategory, index) => (
              <MileageBox>
                <MileageTitle variant="h5">
                  {`${index + 1}. ${ItemNcategory.category}`}
                </MileageTitle>
                <SizedBox />
                <DataGrid {...makeData(ItemNcategory)} />
              </MileageBox>
            ))}
          </MileageContainer>
          <ButtonBox>
            <Button variant="contained" color="primary" onClick={handleApply}>
              신청하기
            </Button>
            <CancelButton text="취소하기" handleClick={handleClose} />
          </ButtonBox>
        </Box>
      </Modal>
    </div>
  );
}
