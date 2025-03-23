
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import UserDetails from './UserDetails';

// import UserList from './UserList';
// import Form from './form.tsx';

export default function Router() {
  return (
    <>
       <BrowserRouter>
        <div>
          <Link to="/" path="<UserDetails />"></Link>
          <Link to="/form" path="<form />">Form</Link>
          <Link to="/userdetails" path="UserDetails">User Details</Link>
        </div>

        <Routes>
          <UserList path="/" />
          <Form path="/form" />
          <UserDetails path="/userdetails" />
        </Routes> 
      </BrowserRouter
    </>
  );
}