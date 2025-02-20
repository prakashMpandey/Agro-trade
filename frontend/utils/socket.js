import {io } from "socket.io-client"



const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  autoConnect:false
});
console.log(import.meta.env)
export default socket