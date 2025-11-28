export function createVehicleCard(vehicle) {
    const div = document.createElement('div');
    div.className = 'vehicle-card';
    div.id = `card-${vehicle.id}`;
    div.innerHTML = `
    <div class="vehicle-header">
      <span class="vehicle-name">${vehicle.name}</span>
      <span class="vehicle-type">${vehicle.type}</span>
    </div>
    <div class="vehicle-stats">
      <div class="stat-item">
        <span>⚡</span> ${vehicle.battery}%
      </div>
      <div class="stat-item">
        <span>⛽</span> ${vehicle.fuel}%
      </div>
      <div class="stat-item">
        <span>📍</span> ${vehicle.status}
      </div>
    </div>
  `;
    return div;
}
