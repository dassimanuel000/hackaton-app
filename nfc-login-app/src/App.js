// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import { getUsers, getUserById, updateUser } from './api';
import AuthPage from './authpage';
import './App.css';   

const App = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleLoginSuccess = (user) => {
        setUser(user);
    };

    const fetchUsers = async() => {
        try {
            const usersData = await getUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const fetchUserById = async(userId) => {
        try {
            const userData = await getUserById(userId);
            setSelectedUser(userData);
        } catch (error) {
            console.error(`Error fetching user with ID ${userId}`, error);
        }
    };

    const handleUpdateUser = async(userId, userData) => {
        try {
            const updatedUser = await updateUser(userId, userData);
            setSelectedUser(updatedUser);
            fetchUsers();
        } catch (error) {
            console.error(`Error updating user with ID ${userId}`, error);
        }
    };
    return (
      <div className="app-container">
        {!user ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div className="user-dashboard">
            <h2 className="welcome-message">Welcome, {user.username}</h2>
            <button className="fetch-button" onClick={fetchUsers}>Fetch Users</button>
            <ul className="user-list">
              {users.map((user) => (
                <li key={user.id} className="user-item" onClick={() => fetchUserById(user.id)}>
                  {user.username}
                </li>
              ))}
            </ul>
            {selectedUser && (
              <div className="user-details">
                <h3>User Details</h3>
                <p>Username: {selectedUser.username}</p>
                <p>Email: {selectedUser.email}</p>
                <button className="update-button" onClick={() => handleUpdateUser(selectedUser.id, selectedUser)}>Update User</button>
              </div>
            )}
          </div>
        )}
        <div className="auth-page">
          <AuthPage />
          <button className="fetch-button" onClick={fetchUsers}>Fetch Users</button>
          {users && <p className="status">Running</p>}
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-item" onClick={() => fetchUserById(user.id)}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default App;