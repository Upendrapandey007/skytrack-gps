import { io } from 'socket.io-client';

console.log("=== TRACKER.JS STARTED ===");

const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3000');
console.log("Socket created:", socket);

const statusEl = document.getElementById('status');
const btn = document.getElementById('toggle-btn');
const latEl = document.getElementById('lat');
const lngEl = document.getElementById('lng');

let watchId = null;
const deviceId = 'PHONE-' + Math.floor(Math.random() * 10000);
const nameInput = document.getElementById('device-name');

console.log("Device ID:", deviceId);

// Expose to window for debugging
window.socket = socket;
window.deviceId = deviceId;

socket.on('connect', () => {
    console.log("✅ Socket CONNECTED to server!");
});

socket.on('disconnect', () => {
    console.log("❌ Socket DISCONNECTED from server!");
});

// Send update immediately when name changes
nameInput.addEventListener('input', () => {
    if (watchId) {
        const lat = parseFloat(latEl.textContent);
        const lng = parseFloat(lngEl.textContent);
        if (!isNaN(lat) && !isNaN(lng)) {
            console.log("Sending name update:", nameInput.value);
            socket.emit('device-update', {
                id: deviceId,
                name: nameInput.value || 'My Bike (Phone)',
                lat: lat,
                lng: lng,
                speed: 0,
                heading: 0
            });
        }
    }
});

btn.addEventListener('click', () => {
    if (watchId) {
        // Stop Tracking
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        btn.textContent = 'Start Tracking';
        btn.classList.remove('stop');
        statusEl.textContent = 'Stopped';
        statusEl.className = 'status inactive';
    } else {
        // Start Tracking
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        btn.textContent = 'Stop Tracking';
        btn.classList.add('stop');
        statusEl.textContent = 'Tracking Active...';
        statusEl.className = 'status active';

        watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, speed, heading } = position.coords;

                latEl.textContent = latitude.toFixed(5);
                lngEl.textContent = longitude.toFixed(5);

                const updateData = {
                    id: deviceId,
                    name: nameInput.value || 'My Bike (Phone)',
                    lat: latitude,
                    lng: longitude,
                    speed: speed || 0,
                    heading: heading || 0
                };

                console.log("📡 Sending device update:", updateData);
                socket.emit('device-update', updateData);

                statusEl.textContent = 'Tracking Active (Signal Locked)';
                statusEl.className = 'status active';
            },
            (error) => {
                console.error("Geolocation error:", error);
                let msg = error.message;
                if (error.code === error.TIMEOUT) {
                    msg = 'GPS Timeout - Move outdoors or check permissions';
                } else if (error.code === error.PERMISSION_DENIED) {
                    msg = 'Location Permission Denied';
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    msg = 'Location Unavailable';
                }
                statusEl.textContent = 'Error: ' + msg;
                statusEl.className = 'status inactive';
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 30000
            }
        );
    }
});

console.log("=== TRACKER.JS INITIALIZED ===");
