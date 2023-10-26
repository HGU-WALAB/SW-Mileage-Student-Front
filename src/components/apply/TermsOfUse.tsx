import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/utils/atom';
import TermsCheckbox from './TermsCheckBox';
import FunctionButton from '../common/FunctionButton';
import CancelButton from '../common/CancelButton';

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
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  thisSemesterItemNum: number;
}

export default function TermsOfUse({ thisSemesterItemNum }: IProps) {
  const userInfo = useRecoilValue(userState);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checked, setChecked] = React.useState(false);

  const handleApply = () => {
    console.log('신청하기');
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
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
            <Box
              sx={{
                minWidth: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography color="primary" id="spring-modal-title" variant="h4" component="h2">
                {`${userInfo.name}(${userInfo.sid}) 학생의 2023-01학기 등록된 마일리지 항목 개수는 ${thisSemesterItemNum}개입니다.`}
              </Typography>
            </Box>
            <Box
              sx={{
                minWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                수집된 개인 정보자료 및 개인정보 제공 동의는 마일리지 지급을 위한 본인 확인을
                위해서만 사용됩니다.
              </Typography>
              <Typography variant="h6">
                본인은 상기 마일리지 항목의 내용에 대해 충분히 검토하였으며 그 내용을 확인합니다.
              </Typography>
              <Typography variant="h6">
                따라서 현재 등록된 마일리지로 장학금 신청에 동의합니다.
              </Typography>
            </Box>
            <Box
              sx={{
                minWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TermsCheckbox checked={checked} setChecked={setChecked} />
            </Box>
            <Box
              sx={{
                minWidth: '400px',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FunctionButton text="신청하기" handleClick={handleApply} />
              <CancelButton text="취소하기" handleClick={handleClose} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
