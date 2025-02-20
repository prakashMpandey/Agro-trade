import {io } from "socket.io-client"
import dotenv from "dotenv"

dotenv.config()
const socket = io(process.env.BACKEND_URL, {
  withCredentials: true,
  autoConnect:false
});

export default socket