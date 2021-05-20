import React, { useState, useEffect } from 'react';
import CustomInput from './components/CustomInput';
import { getUser, User } from './get-user';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [user, setUser] = useState<User | null>(null);

  // fetch api
  useEffect(() => {
    let isMounted = true;

    try {
      const fetchUser = async () => {
        const user = await getUser();
        if (isMounted) {
          setUser(user);
        }
      };

      fetchUser();
    } catch (err) {
      if (isMounted) {
        console.error(err);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div>
      <h1>Testing with RTL</h1>
      {user ? <p>Username: {user.name}</p> : null}
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>

      <p>You typed: {text ? text : '...'}</p>
    </div>
  );
};

export default App;
