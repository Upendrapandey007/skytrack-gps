import './style.css';
import L from 'leaflet';
import { io } from 'socket.io-client';
import { createVehicleCard } from './components/VehicleCard';
import { createStatWidget } from './components/StatWidget';

// Initialize Map
const map = L.map('map').setView([27.7172, 85.3240], 13);

// Dark mode tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

// State
const markers = {};
const vehicleElements = {};

// Socket Connection
const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3000');

// Stats Container
const statsContainer = document.getElementById('stats-container');
statsContainer.appendChild(createStatWidget('Active Vehicles', '0'));

// Update Stats
function updateStats(vehicles) {
  const count = vehicles.length;

  statsContainer.children[0].querySelector('.stat-value').textContent = count;

  document.getElementById('vehicle-count').textContent = count;
  document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
}

socket.on('vehicle-update', (vehicles) => {
  updateStats(vehicles);

  vehicles.forEach(vehicle => {
    // Update or Create Marker
    if (markers[vehicle.id]) {
      markers[vehicle.id].setLatLng([vehicle.lat, vehicle.lng]);
    } else {
      const icon = L.divIcon({
        className: 'custom-marker-icon',
        html: `<div class="marker-pin"></div><div class="marker-pulse"></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });

      const marker = L.marker([vehicle.lat, vehicle.lng], { icon }).addTo(map);
      marker.bindPopup(`<b>${vehicle.name}</b><br>${vehicle.type}`);
      markers[vehicle.id] = marker;
    }

    // Update or Create List Item
    const listContainer = document.getElementById('vehicle-list');
    if (!vehicleElements[vehicle.id]) {
      const card = createVehicleCard(vehicle);

      // Add click handler to zoom to vehicle
      card.addEventListener('click', (e) => {
        // Don't zoom if clicking delete button
        if (e.target.closest('.delete-btn')) return;

        map.flyTo([vehicle.lat, vehicle.lng], 16);
        // Highlight card
        document.querySelectorAll('.vehicle-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      // Add delete button handler
      const deleteBtn = card.querySelector('.delete-btn');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm(`Delete ${vehicle.name}?`)) {
            // Emit delete event to server
            socket.emit('vehicle-delete', vehicle.id);

            // Remove from UI immediately
            if (markers[vehicle.id]) {
              markers[vehicle.id].remove();
              delete markers[vehicle.id];
            }
            card.remove();
            delete vehicleElements[vehicle.id];
          }
        });
      }

      listContainer.appendChild(card);
      vehicleElements[vehicle.id] = card;
    } else {
      // Update stats in card
      const card = vehicleElements[vehicle.id];
      card.querySelector('.vehicle-name').textContent = vehicle.name;
      card.querySelector('.vehicle-stats').innerHTML = `
        <div class="stat-item"><span>⚡</span> ${vehicle.battery}%</div>
        <div class="stat-item"><span>⛽</span> ${vehicle.fuel}%</div>
        <div class="stat-item"><span>📍</span> ${vehicle.status}</div>
      `;

      // Update marker popup
      if (markers[vehicle.id]) {
        markers[vehicle.id].setPopupContent(`<b>${vehicle.name}</b><br>${vehicle.type}`);
      }
    }
  });
});

// Sidebar Toggle Functionality
const sidebarToggle = document.getElementById('sidebar-toggle');
const app = document.getElementById('app');

sidebarToggle.addEventListener('click', () => {
  app.classList.toggle('sidebar-collapsed');

  // Invalidate map size after animation completes
  setTimeout(() => {
    map.invalidateSize();
  }, 300);
});
