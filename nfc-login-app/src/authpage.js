import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const API_URL = 'http://51.83.77.248:8090';

Modal.setAppElement("#root");

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [authStatus, setAuthStatus] = useState("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_, setIsModalOpen_] = useState(false);
  const initiateAuth = async () => {
    setIsModalOpen(true);
    try {
        const response = await axios.get(
          `${API_URL}/create-job/`,
          { email }
        );
        if (response.status === 200) {
            console.log('status 200')
          if (response.data.status === "ok") {
            console.log('job create')
          }else{
            setIsModalOpen(false);
          }
        }
    } catch (error) {
        console.error("Error initiating authentication:", error);
    }
    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${API_URL}/initiate-auth/`,
          { email }
        );
        if (response.status === 200) {
          console.log('status 200');
          if (response.data.status === "ok") {
            setIsModalOpen_(true);
          } else {
            setIsModalOpen(false);
          }
        }
      } catch (error) {
        console.error("Error initiating authentication:", error);
        setIsModalOpen(false); // Close the modal on error
      }
    }, 30000); // Wait 30 seconds before making the call
  };

  const startPolling = (sessionId) => {
    /*const interval = setInterval(async () => {
      const response = await axios.get(
        `${API_URL}/auth-status/${sessionId}`
      );
      setAuthStatus(response.data.status);
      if (response.data.status === "authenticated") {
        clearInterval(interval);
        setIsModalOpen(false);
      }
    }, 2000); // Poll every 2 seconds*/
  };
  return (
    <div>
      {authStatus === "pending" ? (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email here"
          />
          <button onClick={initiateAuth}>Initiate Authentication</button>
        </div>
      ) : (
        <div>User authenticated successfully!</div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="NFC Authentication"
      >
        <h2>Please scan your NFC card with your phone</h2>
        <p>Waiting for card...</p>
      </Modal>
      
      <Modal
        isOpen={isModalOpen_}
        onRequestClose={() => setIsModalOpen_(false)}
        contentLabel="NFC Authentication done"
      >
        <h2>You are Logged </h2>
        <p>Welcome </p>
      </Modal>
    </div>
  );
};

export default AuthPage;