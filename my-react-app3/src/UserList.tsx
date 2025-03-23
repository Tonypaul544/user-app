

// import createElement from 'react'
import React, { useEffect, useState } from 'react';
import './UserList.css';
import './Form.css'
import './UserDetails.css';
import Profile from './images/pfp.jpeg'
import { createRoot } from "react-dom/client" 
const root = createRoot(document.getElementById("root"))


type User = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setFetchError(error);
        setIsLoading(false);
      });

    if (isLoading) {
      return (
        <div>
          <h1>Loading, please wait...</h1>;
        </div>
      )
    }
    if (fetchError) {
      return (
        <div>
          <h1>An error has occured!, check your connection. Abi you no get sub?</h1>
          <button onClick={
            () => {
              fetchUsers();
           }
          }>Reload?</button>
        </div>
      )
    }
  return (
    <div>
      <h1 id='header'>User Management</h1>
        <button id="addUserBtn" onClick={
          () => root.render(
            <div>
              <form id="addUserForm">
                <label>Name:</label>
                <input type="text" id="name" name="name" required placeholder='Enter your name' />
                <label>Email:</label>
                <input type="email" id="email" name="email" required placeholder='Enter your email adress' />
                <label>Phone:</label>
                <input type="tel" id="phone" name="phone" required placeholder='Enter your phone number' />
                <label>Address:</label>
                <input type="text" id="address" name="address" required placeholder='Enter your address' />
                <button id="submitUserBtn" onClick = {
                  (e) => {
                    e.preventDefault();
                    const hidden = document.getElementById('addUserBtn') as HTMLButtonElement;
                    hidden.style.display = 'none';
                    
                    const name = document.getElementById('name') as HTMLInputElement;
                    const email = document.getElementById('email') as HTMLInputElement;
                    const phone = document.getElementById('phone') as HTMLInputElement;
                    const address = document.getElementById('address') as HTMLInputElement;
                    const newUser = {
                      name: name.value,
                      email: email.value,
                      phone: phone.value,
                      address: address.value,
                    };
                    setUsers([...users, newUser]);
                    name.value = '';
                    email.value = '';
                    phone.value = '';
                    address.value = '';

                    document.getElementById('addUserForm')!.style.display = 'none';
                    hidden.style.display = 'block';
                  }
                }>Submit</button>
              </form>
            </div>
          )
        }>Add User</button>
        <div id="userContainer">
          <div id="userDiv">
            {users.map((user) => (
              <div id='user' key={user.phone} onClick={() => 
                root.render(
                  <div id="userDetailDiv">
                  <h2 id="userName"><strong>Name:</strong> {user.name}</h2>
                  <p id="userEmail"><strong>Email:</strong> {user.email}</p>
                  <p id="userPhone"><strong>Phone: </strong> {user.phone}</p>
                  {/* <button id='backHome' onClick={
                    () => root.render(
                      <div>
                        <UserList />
                      </div>
                    )
                  }>Return</button> */}
                </div>
                )
              }>
                  <div className="profile">
                    <img src={ Profile } alt="" id="pfp" />
                    <h2>{ user.name }</h2>
                  </div>
                  <li>Name: { user.email }</li>
                  <li>Phone: { user.phone }</li>
                <div id="userBtn">
                  <button id="editUserBtn">Edit</button>
                  <button id="deleteUserBtn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
   );
 }}
// 
