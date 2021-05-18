import React from 'react';

interface CustomInputProps {
  children: React.ReactNode; // text
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const CustomInput: React.FC<CustomInputProps> = ({ children, value, onChange }) => {
  return (
    <div>
      <label htmlFor='search'>{children}</label>
      <input type='text' id='search' value={value} onChange={onChange} placeholder='enter text' />
    </div>
  );
};

export default CustomInput;
