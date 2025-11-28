export const vehicles = [
    { id: 'V001', name: 'Alpha Truck', type: 'Truck', lat: 27.7172, lng: 85.3240, speed: 0.0002, direction: 0, status: 'Moving', battery: 85, fuel: 70 }, // Thamel
    { id: 'V002', name: 'Beta Van', type: 'Van', lat: 27.7000, lng: 85.3000, speed: 0.00015, direction: 90, status: 'Moving', battery: 60, fuel: 45 }, // Kalimati
    { id: 'V003', name: 'Gamma Car', type: 'Car', lat: 27.6800, lng: 85.3100, speed: 0.00025, direction: 180, status: 'Idle', battery: 92, fuel: 80 }, // Kupondole
    { id: 'V004', name: 'Delta Bike', type: 'Bike', lat: 27.7200, lng: 85.3500, speed: 0.0001, direction: 270, status: 'Moving', battery: 40, fuel: 0 }, // Boudha
    { id: 'V005', name: 'Epsilon Truck', type: 'Truck', lat: 27.6700, lng: 85.3300, speed: 0.00018, direction: 45, status: 'Moving', battery: 75, fuel: 65 } // Patan
];

export function updateVehiclePosition(data) {
    const index = vehicles.findIndex(v => v.id === data.id);
    if (index !== -1) {
        // Update existing vehicle
        vehicles[index] = { ...vehicles[index], ...data, status: 'Moving' };
    } else {
        // Add new vehicle (e.g. the user's phone)
        vehicles.push({
            id: data.id,
            name: data.name || 'My Device',
            type: 'Bike', // Default to Bike as requested
            lat: data.lat,
            lng: data.lng,
            speed: data.speed || 0,
            direction: data.heading || 0,
            status: 'Active',
            battery: Math.floor(Math.random() * 100), // Simulate battery
            fuel: 100
        });
    }
    return vehicles;
}

export function updateVehicles() {
    vehicles.forEach(vehicle => {
        // Only simulate movement for the bots (V001-V005)
        if (vehicle.id.startsWith('V') && vehicle.status === 'Moving') {
            // Simple movement logic
            vehicle.lat += vehicle.speed * Math.cos(vehicle.direction * Math.PI / 180);
            vehicle.lng += vehicle.speed * Math.sin(vehicle.direction * Math.PI / 180);

            // Randomly change direction slightly to make it look natural
            vehicle.direction += (Math.random() - 0.5) * 20;

            // Update battery/fuel slightly
            if (Math.random() > 0.9) vehicle.battery = Math.max(0, vehicle.battery - 1);
            if (Math.random() > 0.9 && vehicle.type !== 'Bike') vehicle.fuel = Math.max(0, vehicle.fuel - 1);
        }
    });
    return vehicles;
}
