import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface IProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function TermsCheckbox({ checked, setChecked }: IProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name="termsCheckbox"
          size="medium"
          color="primary"
        />
      }
      label="이용약관에 동의합니다."
    />
  );
}

export default TermsCheckbox;
