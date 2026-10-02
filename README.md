# Real-time Weather Dashboard

A modern, responsive weather dashboard built with vanilla JavaScript that fetches real-time weather data using asynchronous APIs.

## Features

✅ **Async/Await Implementation** - Modern async JavaScript for clean, readable asynchronous code
✅ **Fetch API** - Uses the native Fetch API to get data from REST endpoints
✅ **Error Handling** - Comprehensive error handling for network failures and invalid inputs
✅ **JSON Parsing** - Dynamically parses and renders complex nested JSON objects
✅ **Search Functionality** - Search weather by city name with instant results
✅ **Real-time Data** - Live weather metrics updated on demand
✅ **Responsive Design** - Works seamlessly on mobile and desktop devices
✅ **No API Key Required** - Uses Open-Meteo's free weather API (no registration needed)

## Weather Data Displayed

- **Temperature** - Current temperature in Celsius
- **Humidity** - Relative humidity percentage
- **Wind Speed** - Current wind speed in km/h
- **Pressure** - Atmospheric pressure in hPa
- **Feels Like** - Apparent temperature
- **Weather Condition** - Description of current weather

## How to Use

1. **Open the Dashboard**
   - Simply open `index.html` in your web browser

2. **Search for a City**
   - Type a city name in the search box (e.g., "Tokyo", "New York", "Paris")
   - Click the "Search" button or press Enter

3. **View Weather Data**
   - The dashboard will display the current weather for the selected city
   - All metrics update instantly

## Technical Implementation

### JavaScript Features Used

#### 1. **Async/Await Pattern**
```javascript
async function fetchWeatherData(cityName) {
    try {
        const geoResponse = await fetch(...);
        const geoData = await geoResponse.json();
        // ... process data
    } catch (error) {
        // ... error handling
    }
}
```

#### 2. **Fetch API with Error Handling**
- HTTP status validation with `response.ok`
- Network error detection with try/catch
- User-friendly error messages
- Graceful fallback behavior

#### 3. **JSON Data Processing**
- Parses nested JSON objects from two API endpoints
- Extracts relevant weather properties
- Transforms WMO weather codes to human-readable descriptions

#### 4. **DOM Manipulation**
- Dynamic element updates without page refresh
- CSS class manipulation for UI states
- Event listeners for user interactions

### API Integration

The dashboard uses two endpoints from the **Open-Meteo API**:

1. **Geocoding API** - Converts city names to coordinates
   ```
   https://geocoding-api.open-meteo.com/v1/search
   ```

2. **Weather API** - Fetches weather data for given coordinates
   ```
   https://api.open-meteo.com/v1/forecast
   ```

## File Structure

```
├── index.html        # HTML structure and DOM elements
├── styles.css        # Modern styling with animations
├── script.js         # JavaScript logic with async/await
└── README.md         # Documentation
```

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ (async/await, arrow functions, template literals)
- Fetch API
- CSS Grid and Flexbox

## Key Learning Points

1. **Error Handling Strategies**
   - Network errors (connection failures)
   - Data validation errors (city not found)
   - HTTP errors (4xx, 5xx responses)
   - User input validation

2. **Asynchronous Flow Control**
   - Managing multiple async operations
   - Sequential fetches (geocoding → weather)
   - Loading states with spinners
   - Promise-based error handling

3. **JSON Data Structures**
   - Working with nested objects
   - Destructuring assignment
   - Mapping data codes to human-readable values

4. **User Experience**
   - Loading indicators
   - Clear error messages
   - Input validation
   - Responsive design

## Example Usage

```javascript
// Search for weather in Tokyo
const city = "Tokyo";
const weatherData = await fetchWeatherData(city);
renderWeather(weatherData);
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "City not found" | Check spelling, try full city names (e.g., "New York" instead of "NYC") |
| Network error | Check your internet connection, the API might be temporarily down |
| Data not updating | Refresh the page and try searching again |

## Future Enhancements

- 📍 Geolocation-based weather (use browser's location API)
- 📊 Weather forecast (7-day, hourly predictions)
- 🌍 Multiple city comparison
- 🎨 Theme switcher (dark/light mode)
- 💾 Search history with local storage
- 📱 PWA features (offline support)

## License

Free to use for educational purposes.
