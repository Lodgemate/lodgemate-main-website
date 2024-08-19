import React, { useState, useEffect, useRef } from 'react';

const WebSocketComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const socketRef = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    // Create WebSocket connection
    socketRef.current = new WebSocket('ws://localhost:3000/chats');

    // Connection opened
    socketRef.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // Listen for messages
    socketRef.current.onmessage = (event: MessageEvent) => {
      const receivedMessage = event.data as string;
      console.log('Message received:', receivedMessage); // Debug log
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    // Handle errors
    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Connection closed
    socketRef.current.onclose = (event) => {
      console.log('WebSocket closed:', event);
      // Attempt to reconnect after a delay
      if (!event.wasClean) {
        console.log('Reconnecting...');
        setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
      }
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // Handle message input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  // Send message to WebSocket server
  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log('Sending message:', inputMessage); // Debug log
      socketRef.current.send(inputMessage);
      setInputMessage(''); // Clear the input field after sending
    } else {
      console.log('WebSocket not connected or input is empty'); // Debug log
    }
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={handleInputChange}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default WebSocketComponent;
