import React, { useEffect, useState } from 'react';
import './UserList.css';
import './Form.css';
import './UserDetails.css';
import Profile from './images/pfp.jpeg';

type User = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setFetchError("An error has occurred! Check your connection.");
        setIsLoading(false);
      });
  }

  function handleAddOrUpdateUser(e: React.FormEvent) {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;

    if (!name || !email || !phone || !address) return;

    const updatedUser: User = { name, email, phone, address };

    if (editingUser) {
      setUsers(users.map(user => (user.phone === editingUser.phone ? updatedUser : user)));
      setEditingUser(null);
    } else {
      setUsers([...users, updatedUser]);
    }

    (document.getElementById('addUserForm') as HTMLFormElement).reset();
    setShowForm(false);
  }

  function handleDeleteUser(phone: string) {
    setUsers(users.filter(user => user.phone !== phone));
  }

  function handleEditUser(user: User) {
    setEditingUser(user);
    setShowForm(true);
  }

  function handleUserClick(user: User) {
    setSelectedUser(user);
  }

  return (
    <div>
      <h1 id="header">User Management</h1>

      {isLoading && <h2>Loading, please wait...</h2>}
      {fetchError && (
        <div>
          <h2>{fetchError}</h2>
          <button onClick={fetchUsers}>Reload?</button>
        </div>
      )}

      {!isLoading && !fetchError && !selectedUser && (
        <>
          <button id="addUserBtn" onClick={() => { setShowForm(true); setEditingUser(null); }}>
            {editingUser ? "Edit User" : "Add User"}
          </button>

          {showForm && (
            <form id="addUserForm" onSubmit={handleAddOrUpdateUser}>
              <label>Name:</label>
              <input type="text" id="name" required placeholder="Enter your name" defaultValue={editingUser?.name || ''} />
              <label>Email:</label>
              <input type="email" id="email" required placeholder="Enter your email address" defaultValue={editingUser?.email || ''} />
              <label>Phone:</label>
              <input type="tel" id="phone" required placeholder="Enter your phone number" defaultValue={editingUser?.phone || ''} disabled={!!editingUser} />
              <label>Address:</label>
              <input type="text" id="address" required placeholder="Enter your address" defaultValue={editingUser?.address || ''} />
              <button id="submitUserBtn" type="submit">
                {editingUser ? "Update User" : "Submit"}
              </button>
            </form>
          )}

          <div id="userContainer">
            <div id="userDiv">
              {users.map((user) => (
                <div id="user" key={user.phone} onClick={() => handleUserClick(user)}>
                  <div className="profile">
                    <img src={Profile} alt="Profile" id="pfp" />
                    <h2>{user.name}</h2>
                  </div>
                  <li>Name: {user.email}</li>
                  <li>Phone: {user.phone}</li>
                  <div id="userBtn">
                    <button id="editUserBtn" onClick={(e) => { e.stopPropagation(); handleEditUser(user); }}>Edit</button>
                    <button id="deleteUserBtn" onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.phone); }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedUser && (
        <div id="userDetailDiv">
          <h2 id="userName"><strong>Name:</strong> {selectedUser.name}</h2>
          <p id="userEmail"><strong>Email:</strong> {selectedUser.email}</p>
          <p id="userPhone"><strong>Phone:</strong> {selectedUser.phone}</p>
          <p id="userAddress"><strong>Address:</strong> {selectedUser.address}</p>
          <button id="backHome" onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
