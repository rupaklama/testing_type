import React, { useState } from 'react';
import CustomInput from './components/CustomInput';

const App: React.FC = () => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div>
      <h1>Testing with RTL</h1>
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>

      <p>You typed: {text ? text : '...'}</p>
    </div>
  );
};

export default App;
