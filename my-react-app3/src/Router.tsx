


// Router.tsx (Fixed)
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserDetails from './UserDetails';
import Form from './form';
import UserList from './UsersPage';

export default function Router() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">Home</Link>
        <Link to="/form">Form</Link>
        <Link to="/userdetails">User Details</Link>
      </div>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/form" element={<Form />} />
        <Route path="/userdetails" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
