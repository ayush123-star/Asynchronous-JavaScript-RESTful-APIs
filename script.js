// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const mainCard = document.querySelector('.main-card');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorContainer = document.getElementById('errorContainer');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

/**
 * Fetch weather data for a given city using Open-Meteo API
 * @async
 * @param {string} cityName - The name of the city to fetch weather for
 * @returns {Promise<Object>} Weather data object or null if error
 */
async function fetchWeatherData(cityName) {
    try {
        // Step 1: Geocode city name to get coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error(`HTTP Error: ${geoResponse.status}`);
        }

        const geoData = await geoResponse.json();

        // Check if city was found
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
        }

        // Extract coordinates from first result
        const { latitude, longitude, name, country } = geoData.results[0];

        // Step 2: Fetch weather data using coordinates
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error(`HTTP Error: ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();

        // Step 3: Parse and return formatted weather data
        return {
            city: name,
            country: country,
            current: weatherData.current
        };

    } catch (error) {
        // Comprehensive error handling
        if (error instanceof TypeError) {
            throw new Error('Network error: Could not connect to weather service. Please check your internet connection.');
        }
        throw error;
    }
}

/**
 * Get weather description from WMO weather code
 * @param {number} code - WMO weather code
 * @returns {string} Human-readable weather description
 */
function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    return descriptions[code] || 'Unknown';
}

/**
 * Render weather data to the UI
 * @param {Object} data - Weather data object
 */
function renderWeather(data) {
    if (!data || !data.current) {
        showError('Invalid weather data received');
        return;
    }

    // Destructure weather data
    const { temperature_2m, relative_humidity_2m, wind_speed_10m, pressure_msl, apparent_temperature, weather_code } = data.current;

    // Update DOM elements with weather data
    document.getElementById('cityName').textContent = `${data.city}, ${data.country}`;
    document.getElementById('temperature').textContent = Math.round(temperature_2m);
    document.getElementById('humidity').textContent = `${relative_humidity_2m}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(wind_speed_10m)} km/h`;
    document.getElementById('pressure').textContent = `${Math.round(pressure_msl)} hPa`;
    document.getElementById('feelsLike').textContent = `${Math.round(apparent_temperature)}°C`;
    document.getElementById('weatherDesc').textContent = getWeatherDescription(weather_code);

    // Show the weather card
    mainCard.classList.remove('hidden');
    hideError();
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorContainer.textContent = `⚠️ ${message}`;
    errorContainer.classList.remove('hidden');
    mainCard.classList.add('hidden');
}

/**
 * Hide error message
 */
function hideError() {
    errorContainer.classList.add('hidden');
}

/**
 * Show loading spinner
 */
function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

/**
 * Main search handler - orchestrates fetch and render
 * @async
 */
async function handleSearch() {
    const city = searchInput.value.trim();

    // Validate input
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    // Show loading state
    showLoading();
    hideError();

    try {
        // Fetch weather data
        const weatherData = await fetchWeatherData(city);

        // Render weather to UI
        renderWeather(weatherData);

        // Clear input for next search
        searchInput.value = '';

    } catch (error) {
        // Show error to user
        showError(error.message);
        console.error('Weather fetch error:', error);

    } finally {
        // Always hide loading spinner
        hideLoading();
    }
}

// Optional: Load weather for default city on page load
window.addEventListener('load', () => {
    searchInput.value = 'London';
    handleSearch();
});
