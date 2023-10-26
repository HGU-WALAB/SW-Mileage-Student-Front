import { Button } from '@mui/material';

interface IProps {
  text: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
}

export default function CancelButton({ text, handleClick, id }: IProps) {
  return (
    <Button variant="outlined" color="error" id={id} onClick={handleClick}>
      {text}
    </Button>
  );
}
