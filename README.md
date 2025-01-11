# Real-Time Chat Application

This project consists of a **frontend** (React) and **backend** (Node.js with Socket.io) for building a real-time chat application.

## Backend (Server) Setup

### Step 1: Navigate to the server folder

```bash
cd server
```

### Step 2: Install backend dependencies

Run the following command to install the necessary dependencies for the backend:

```bash
npm install
```

#### Server Dependencies

The following dependencies are required for the backend:

```bash
npm install express socket.io nodemon
```

### Step 4: Start the backend server

```bash
npm start
```

This will run the backend server at `http://localhost:5000`.

---

## Frontend (Client) Setup

### Step 1: Navigate to the client folder

```bash
cd client
```

### Step 2: Install frontend dependencies

Run the following command to install the necessary dependencies for the frontend:

```bash
npm install
```

#### Client Dependencies

The following dependencies are required for the frontend:

```bash
npm install react react-dom react-router-dom react-scripts react-scroll-to-bottom socket.io-client web-vitals
```

### Step 3: Start the frontend development server

To run the frontend, use the following command:

```bash
npm start
```

This will run the React app on `http://localhost:3000`. 

---

## Connecting Frontend and Backend

1. The frontend communicates with the backend via **Socket.io** for real-time messaging.
2. The backend runs on `http://localhost:5000` by default.

---

## How Real-Time Chat Works

- **Real-Time Communication**: The backend uses **Socket.io** to send and receive messages in real-time between users.
- **Typing Indicator**: The backend listens for typing events and displays a typing indicator when another user is typing a message.
- **Message Handling**: Messages are sent to the backend and broadcasted to all connected clients.
- **User Join/Leave Events**: Whenever a user joins or leaves the chat, the backend notifies all connected users.
