import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IsShowStudentApplyModalState, userState } from 'src/utils/atom';
import { styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllMileageThisSemester } from 'src/apis/mileage';
import TermsCheckbox from './TermsCheckBox';
import CancelButton from '../common/CancelButton';

const FlexBox = styled(Box)({
  minWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const ButtonBox = styled(Box)({
  minWidth: '800px',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center',
});

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>((props, ref) => {
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  minWidth: '800px',

  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  py: 6,
};

interface IProps {
  thisSemesterItemNum: number;
}

export default function TermsOfUse({ thisSemesterItemNum }: IProps) {
  const userInfo = useRecoilValue(userState);
  const setIsShowApplyModal = useSetRecoilState(IsShowStudentApplyModalState);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checked, setChecked] = React.useState(false);

  const handleApply = async () => {
    await handleClose();
    setIsShowApplyModal(true);
    console.log('!!');
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        ☘️ 마일리지 신청 하기
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <FlexBox>
              <Typography
                sx={{ display: 'flex', gap: '5px' }}
                id="spring-modal-title"
                variant="h6"
                component="h2"
              >
                <Typography
                  color="primary"
                  variant="h6"
                >{`${userInfo.name} (${userInfo.sid})`}</Typography>
                학생의
                <Typography color="primary" variant="h6">
                  2023-01
                </Typography>
                학기 등록된 마일리지 항목 개수는
                <Typography color="primary" variant="h6">
                  {thisSemesterItemNum}개
                </Typography>
                입니다.
              </Typography>
            </FlexBox>
            <FlexBox>
              <Typography variant="body1">
                수집된 개인 정보자료 및 개인정보 제공 동의는 마일리지 지급을 위한 본인 확인을
                위해서만 사용됩니다.
              </Typography>
              <Typography variant="body1">
                본인은 상기 마일리지 항목의 내용에 대해 충분히 검토하였으며 그 내용을 확인합니다.
              </Typography>
              <Typography variant="body1">
                따라서 현재 등록된 마일리지로 장학금 신청에 동의합니다.
              </Typography>
            </FlexBox>
            <FlexBox>
              <TermsCheckbox checked={checked} setChecked={setChecked} />
            </FlexBox>
            <ButtonBox>
              <Button variant="contained" color="primary" onClick={handleApply} disabled={!checked}>
                신청하기
              </Button>
              <CancelButton text="취소하기" handleClick={handleClose} />
            </ButtonBox>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
