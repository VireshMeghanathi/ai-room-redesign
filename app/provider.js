// provider.js
'use client'
import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      VerifyUser();
    }
  }, [user]);

  const VerifyUser = async () => {
    try {
      const response = await axios.post("/api/verify-user", {
        email: user.primaryEmailAddress.emailAddress,
        name: user.fullName,
        imageUrl: user.imageUrl,
      });
  
      console.log("Verification result:", response.data);
    } catch (error) {
      // Log error more thoroughly
      if (error.response) {
        console.error("Verification failed with response:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        console.error("Request was made but no response received:", error.request);
      } else {
        console.error("Error during verification:", error.message);
      }
    }
  };
  

  return <div>{children}</div>;
}

export default Provider;  // Ensure it's exported as default
