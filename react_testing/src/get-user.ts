export interface User {
  id: string;
  name: string;
}

export const getUser = () => {
  return Promise.resolve({ id: '1', name: 'Rupak' });
};
