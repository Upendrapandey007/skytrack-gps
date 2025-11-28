export function createStatWidget(label, value) {
    const div = document.createElement('div');
    div.className = 'stat-card';
    div.innerHTML = `
    <div class="stat-value">${value}</div>
    <div class="stat-label">${label}</div>
  `;
    return div;
}
