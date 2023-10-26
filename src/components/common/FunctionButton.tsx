import { Button } from '@mui/material';

interface IProps {
  text: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
}

export default function FunctionButton({ text, handleClick, id }: IProps) {
  return (
    <Button variant="contained" color="primary" id={id} onClick={handleClick}>
      {text}
    </Button>
  );
}
