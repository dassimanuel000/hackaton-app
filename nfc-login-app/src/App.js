// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import { getUsers, getUserById, updateUser } from './api';
import AuthPage from './authpage';

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

    return ( <
        div > {!user ? ( <
                Login onLoginSuccess = { handleLoginSuccess }
                />
            ) : ( <
                div >
                <
                h2 > Welcome, { user.username } < /h2> <
                button onClick = { fetchUsers } > Fetch Users < /button> <
                ul > {
                    users.map((user) => ( <
                        li key = { user.id }
                        onClick = {
                            () => fetchUserById(user.id) } > { user.username } <
                        /li>
                    ))
                } <
                /ul> {
                    selectedUser && ( <
                        div >
                        <
                        h3 > User Details < /h3> <
                        p > Username: { selectedUser.username } < /p> <
                        p > Email: { selectedUser.email } < /p> { /* Add more user details as needed */ } <
                        button onClick = {
                            () => handleUpdateUser(selectedUser.id, selectedUser) } > Update User < /button> <
                        /div>
                    )
                } <
                /div>
            )
        } <
        div >
        <
        AuthPage / >
        <
        button onClick = { fetchUsers } > Fetch Users < /button> {
            users && ( <
                p > running < /p>
            )
        } <
        ul > {
            users.map((user) => ( <
                li key = { user.id }
                onClick = {
                    () => fetchUserById(user.id) } > { user.username } <
                /li>
            ))
        } <
        /ul> <
        /div> <
        /div>
    );
};

export default App;