import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

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
        const response = await axios.post(
          "http://127.0.0.1:8090/initiate-auth/",
          { email }
        );
        if (response.status === 200) {
          if (response.data.status === "ok") {
            setIsModalOpen_(true);
          }
        }
    } catch (error) {
        console.error("Error initiating authentication:", error);
    }
  };

  const startPolling = (sessionId) => {
    /*const interval = setInterval(async () => {
      const response = await axios.get(
        `http://51.83.77.248:8090/auth-status/${sessionId}`
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