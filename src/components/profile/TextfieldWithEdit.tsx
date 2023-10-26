import { Box, TextField } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import TypoWithEdit from './TypoWithEdit';

interface IProps {
  isEditing: boolean;
  state: string;
  placeholder?: string;
  control: Control;
}

export default function TextfieldWithEdit({ isEditing, state, placeholder, control }: IProps) {
  return (
    <>
      {isEditing ? (
        <Controller
          name={state}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              color="primary"
              sx={{ width: '100%', mb: 1 }}
              placeholder={placeholder}
            />
          )}
        />
      ) : (
        <TypoWithEdit name="value" fieldName="필드" />
      )}
    </>
  );
}
