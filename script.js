function updateClock() {
    const now = new Date();
    const day = now.getDay().toString();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    // const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    const daystring = `${day}`;
    document.getElementById('clock').textContent = timeString;
    
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[now.getDay()];
    document.getElementById('day').textContent = dayOfWeek;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[now.getMonth()];
    const dayOfMonth = now.getDate();
    const year = now.getFullYear();
    const dateString = `${dayOfMonth} ${month} ${year}`;
    document.getElementById('date').textContent = dateString;
    
    getWeather();
}

function getWeather() {
    const apiKey = '8d0892ff7ff24a1390e9ee93ffd916de'; // Replace with your OpenWeatherMap API key
    const city = 'shirpur'; // Replace with your city name
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherTemp = (data.main.temp - 273.15).toFixed(2);
            
            const weatherIcon = getWeatherIcon(data.weather[0].icon);

            const weatherString = `${weatherIcon} ${weatherTemp}`;
            document.getElementById('weather').textContent = weatherString;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').textContent = 'Weather data not available';
        });
}

function getWeatherIcon(iconCode) {
    // Map OpenWeatherMap icon codes to corresponding climate icons
    const iconMap = {
        '01d': '☀️', // clear sky (day)
        '01n': '🌙', // clear sky (night)
        '02d': '⛅', // few clouds (day)
        '02n': '☁️', // few clouds (night)
        '03d': '☁️', // scattered clouds (day)
        '03n': '☁️', // scattered clouds (night)
        '04d': '☁️', // broken clouds (day)
        '04n': '☁️', // broken clouds (night)
        '09d': '🌧️', // shower rain (day)
        '09n': '🌧️', // shower rain (night)
        '10d': '🌦️', // rain (day)
        '10n': '🌧️', // rain (night)
        '11d': '⛈️', // thunderstorm (day)
        '11n': '⛈️', // thunderstorm (night)
        '13d': '❄️', // snow (day)
        '13n': '❄️', // snow (night)
        '50d': '🌫️', // mist (day)
        '50n': '🌫️'  // mist (night)
    };

    return iconMap[iconCode] || '❓'; // Default to a question mark if the icon is unknown
}

// Update the clock every second
setInterval(updateClock, 1000);

// Optional: You can add more animations or interactive features using JavaScript.
