// src/utils/sessionId.js
import { v4 as uuidv4 } from 'uuid';

export const getSessionId = () => {
  if (typeof window !== 'undefined') {
    let sessionId = localStorage.getItem('sessionId');
    
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('sessionId', sessionId);
    }
    
    return sessionId;
  }
  
  return null;
};