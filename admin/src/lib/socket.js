import { io } from "socket.io-client";

import * as config from '../routes/config.json'

const socketClient = io(config.server, {
    withCredentials: true
})
export const socket = socketClient;

// On connection error
socket.on("connect_error", (err) => {
    // If user is not logged in, redirect
    console.log(err); // prints the message associated with the error
    if(err.data == 401) {
        if(global.location) global.location.replace("https://apidisco.melo.se/login")
    }

    if( err.data == 403) {
        alert("Du har inte behörighet")
    }
});