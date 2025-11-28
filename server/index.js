import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { vehicles, updateVehicles, updateVehiclePosition } from './vehicleData.js';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Send initial data
    socket.emit('vehicle-update', vehicles);

    // Handle updates from phone tracker
    socket.on('device-update', (data) => {
        console.log('📱 Received device-update:', data);
        updateVehiclePosition(data);
        console.log('📡 Broadcasting to all clients, total vehicles:', vehicles.length);
        // Broadcast immediately so the map updates instantly
        io.emit('vehicle-update', vehicles);
    });

    // Handle vehicle deletion
    socket.on('vehicle-delete', (vehicleId) => {
        console.log('🗑️ Deleting vehicle:', vehicleId);
        const index = vehicles.findIndex(v => v.id === vehicleId);
        if (index !== -1) {
            vehicles.splice(index, 1);
            console.log('✅ Vehicle deleted. Remaining:', vehicles.length);
            // Broadcast updated list to all clients
            io.emit('vehicle-update', vehicles);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Broadcast updates every 1 second
setInterval(() => {
    const updatedVehicles = updateVehicles();
    io.emit('vehicle-update', updatedVehicles);
}, 1000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
