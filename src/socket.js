import { io } from "socket.io-client";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"; // Replace with the actual default URL
const socket = io(backendUrl.replace("/api/v1", ""));

export { socket };
