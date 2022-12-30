
const { Server } = require("socket.io");
const auth = require('./auth/auth'); // Import auth code
const _ = require("lodash")
const Dot = require('dot-object');
const dot = new Dot(".", undefined, false, false)

const config = require('./config.json');
const { update } = require("lodash");

let parseDB = async (DB) => {
    let convertedDB = {};

    for(const booking of DB) {
        let newBooking = {
            "guardianName": booking.guardianName,
            "guardianSurname": booking.guardianSurname,
            "phone": booking.phone,
            "children": [],
            "paid": booking.paid,
            "ID": booking.ID
          };
        
        for(const child of booking.children) {
            newBooking.children.push({
                ...child,
            })
        }

        convertedDB[booking.ID] = newBooking;
    }

    return convertedDB;
}

const adminServer = async (httpServer, manageServer, db) => {
    io = new Server(httpServer, {
        cors: {
            origin: ["http://192.168.86.197:5173", "http://localhost:5173", "http://localhost:5174", "http://192.168.1.13:5174"],
            credentials: true,
        }
    });


    // Add login middleware
    //io.use(auth.jwt.socketIoMiddleware);


    let DB = await parseDB(await manageServer.getBookings());
    let changes = {};

    io.on("connection", (socket) => {
        console.log(socket.handshake.headers)
        console.log("connected")
        
        // Relay information from one client to the others
        socket.on("update", (data) => {
            changes = _.mergeWith(
                {}, changes, data,
                (a, b) => b === null ? a : undefined
            )
            socket.broadcast.emit("update", changes)
        })

        socket.on("getDB", (cb) => {
            cb(DB);

            socket.emit('update', changes);
        })

        socket.on("updateDB", () => {
            console.log("updateDB")
            updateDB(true)
        })
    });

    let updateDB = async (force=false) => {
        if(Object.keys(changes).length > 0 || force) { // If there are pending changes
            for(bookingID in changes) {
                let bookingChanges = changes[bookingID];

                var dotNotation = dot.dot(bookingChanges, )

                db.bookings.update({ID: parseInt(bookingID)}, {$set: dotNotation}, {multi: false}, async function (err) {
                    if(err) console.error(err);
                })
            }
            changes = {}
            DB = await parseDB(await manageServer.getBookings());
            console.log(DB)

            io.emit('getDB');
            io.emit('update', changes);

            console.log("Sent changes to DB");
        }
    }
    setInterval(updateDB, 1000 * 60 * 5) // Update DB every 5 minutes if there are changes


}

module.exports = adminServer;
