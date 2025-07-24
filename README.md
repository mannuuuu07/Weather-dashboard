# Weather Dashboard

A simple weather dashboard web app that displays current weather and a 5-day forecast for any city using the OpenWeatherMap API.

## Features
- Search for weather by city name
- Displays current temperature, weather condition, humidity, and wind speed
- Shows a 5-day forecast with icons
- Toggle between Celsius and Fahrenheit
- Dark mode support (remembers your preference)
- Optionally fetches weather for your current location on load

## Getting Started

1. **Clone or download this repository.**
2. **Open `index.html` in your browser.**
3. **Enter a city name and click the search button.**

## Files
- `index.html` – Main HTML file
- `script.js` – JavaScript logic for fetching and displaying weather
- `style.css` – Styles for the dashboard


## API Key Setup
This app uses the [OpenWeatherMap API](https://openweathermap.org/api). For security, the API key is stored in a separate `config.js` file.

1. Copy the following into a new file named `config.js` in the project folder:
   ```js
   // config.js
   const API_KEY = "YOUR_API_KEY_HERE";
   ```
2. Replace `YOUR_API_KEY_HERE` with your actual OpenWeatherMap API key.
3. Make sure `config.js` is listed in `.gitignore` so your API key is not committed to version control.
4. In your `index.html`, include `config.js` before `script.js`:
   ```html
   <script src="config.js"></script>
   <script src="script.js"></script>
   ```

## Customization
- You can change the default units or styling in `script.js` and `style.css`.

## License
This project is for educational/demo purposes.
