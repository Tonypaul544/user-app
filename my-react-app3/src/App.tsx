

import UserDetails from './UserDetails';
import UsersPage from './UsersPage';
// import Form from './form';
import Router from './Router';

export default function App() {
  return (
    <>
      <Router />
      <UsersPage />
      <UserDetails />
      {/* <Form /> */}
    </>
  );
}