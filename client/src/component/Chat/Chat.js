import React, { useEffect, useState } from 'react';
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

let socket;
const ENDPOINT = "https://real-time-chat-backend-lwvo.onrender.com/";

const Chat = () => {
    const [id, setId] = useState(""); // State to store user socket ID
    const [messages, setMessages] = useState([]); // State to store chat messages
    const [typingUser, setTypingUser] = useState(null); // State for typing indicator
    const [typingTimeout, setTypingTimeout] = useState(null); // State to handle typing timeout

    const send = () => {
        const message = document.getElementById('chatInput').value;
        if (message.trim()) {
            socket.emit('message', { message, id }); // Send message event
            document.getElementById('chatInput').value = "";
        }
    };

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] }); // Connect to socket

        socket.on('connect', () => {
            setId(socket.id); // Set user ID on connection
        });

        socket.emit('joined', { user }); // Notify server of new user

        socket.on('welcome', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('userJoined', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('leave', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.emit('leaveChat'); // Notify server on disconnection
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('typing', ({ userTyping, isTyping }) => {
            if (isTyping) {
                setTypingUser(userTyping); // Set the user who is typing
            } else {
                setTypingUser(null); // Clear typing indicator when no one is typing
            }
        });

        return () => {
            socket.off('sendMessage');
            socket.off('typing');
        };
    }, []);

    const handleTyping = () => {
        socket.emit('typing', { userTyping: user, isTyping: true });

        // Clear previous timeout and set a new one to stop typing after 1 second
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const timeout = setTimeout(() => {
            socket.emit('typing', { userTyping: user, isTyping: false });
        }, 1000);

        setTypingTimeout(timeout);
    };

    useEffect(() => {
    }, [typingUser]); // Debugging state change

    return (
        <div className="chatPage">
            <div className="chatContainer">
                {/* Chat header */}
                <div className="header">
                <div>
                    <h2>Real-Time Chat App</h2>
                
                    {typingUser && <div className="typingIndicator">{typingUser} is typing...</div>}
                </div>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>


                {/* Chat messages */}
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message
                            key={i}
                            user={item.id === id ? '' : item.user}
                            message={item.message}
                            classs={item.id === id ? 'right' : 'left'}
                        />
                    ))}
                </ReactScrollToBottom>
                {/* Input box for sending messages */}
                <div className="inputBox">
                    <input
                        onKeyDown={(event) => event.key === 'Enter' ? send() : handleTyping()}
                        type="text"
                        id="chatInput"
                        placeholder="Type a message..."
                    />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
