// src/services/api.js
import axios from 'axios';

const API_URL = 'http://51.83.77.248:8090';

const login = async(username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error during login', error);
        throw error;
    }
};

const getUsers = async() => {
    try {
        const response = await axios.get(`${API_URL}/users/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};

const getUserById = async(userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}`, error);
        throw error;
    }
};

const updateUser = async(userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error updating user with ID ${userId}`, error);
        throw error;
    }
};

export { login, getUsers, getUserById, updateUser };