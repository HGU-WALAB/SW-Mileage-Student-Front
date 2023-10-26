import { Box } from '@mui/material';
import FunctionButton from '../common/FunctionButton';
import CancelButton from '../common/CancelButton';

interface IProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileEditCancelButton({ isEditing, setIsEditing }: IProps) {
  const handleProfileEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { id } = e.currentTarget;

    if (id === 'edit-open-profile') {
      setIsEditing(true);
    } else if (id === 'edit-close-profile') {
      setIsEditing(false);
    } else if (id === 'edit-cancel-profile') {
      setIsEditing(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        gap: '20px',
        px: '30px',
      }}
    >
      <FunctionButton
        text={isEditing ? '프로필 수정' : '프로필 편집'}
        handleClick={handleProfileEdit}
        id={isEditing ? 'edit-cancel-profile' : 'edit-open-profile'}
      />
      {isEditing && (
        <CancelButton text="취소" handleClick={handleProfileEdit} id="edit-cancel-profile" />
      )}
    </Box>
  );
}
