
// Initialize the map centered on India
const map = L.map('map').setView([20.5937, 78.9629], 5);

// Add OpenStreetMap tiles for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Add a live location pointer (marker) with a custom pulsing icon
const customIcon = L.divIcon({
  className: 'custom-icon',
  html: '<div class="pulse"></div>',
  iconSize: [20, 20],
});
const marker = L.marker([0, 0], { icon: customIcon }).addTo(map);

// Variables for tracking state
let tracking = false; // To track whether location tracking is on or off
let watchId; // Stores the ID of the geolocation watcher

// UI Elements
const toggleTracking = document.getElementById('toggleTracking');
const latitudeDisplay = document.getElementById('latitude');
const longitudeDisplay = document.getElementById('longitude');

// Function to toggle tracking
toggleTracking.addEventListener('click', () => {
  if (!tracking) {
    toggleTracking.textContent = 'Stop Tracking'; // Change button text
    startTracking();
  } else {
    toggleTracking.textContent = 'Start Tracking'; // Reset button text
    stopTracking();
  }
  tracking = !tracking; // Update tracking status
});

// Function to start tracking the user's location
function startTracking() {
  if (navigator.geolocation) {
    // Watch for location updates
    watchId = navigator.geolocation.watchPosition(
      updateLocation, // Called on location update
      handleError, // Called on error
      { enableHighAccuracy: true } // Use high-accuracy GPS
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

// Function to stop tracking the user's location
function stopTracking() {
  if (watchId !== undefined) {
    navigator.geolocation.clearWatch(watchId); // Stop watching location
  }
}

// Function to update the location on the map and UI
function updateLocation(position) {
  const { latitude, longitude } = position.coords; // Get latitude and longitude

  // Move the marker to the new location
  marker.setLatLng([latitude, longitude]);

  // Center the map on the new location
  map.setView([latitude, longitude], 16);

  // Update the latitude and longitude in the UI
  latitudeDisplay.textContent = latitude.toFixed(6);
  longitudeDisplay.textContent = longitude.toFixed(6);
}

// Function to handle errors during location tracking
function handleError(error) {
  alert(`Error: ${error.message}`); // Show an error message
}
