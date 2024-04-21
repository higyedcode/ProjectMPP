import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketTest = () => {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
  const socketUrl = 'ws://localhost:8080/websocket'  ;
  const newSocket = new WebSocket(socketUrl);

  newSocket.onopen = () => {
    console.log('Websocket connection opened!');

  }

    // Event listener for WebSocket connection close
    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
      // You can perform any cleanup or reconnect logic here
    };

        // Event listener for WebSocket errors
        newSocket.onerror = (error) => {
          console.error('WebSocket error:', error);
          // You can handle any errors that occur during the WebSocket connection here
        };
        
           // Set the WebSocket instance in state
        setSocket(newSocket);

        return () => {
          if(newSocket){
            newSocket.close();
          }
        }

  }, []);

  return (
    <div>
      <h1>WebSocket Test</h1>
    </div>
  );
};

export default WebSocketTest;
