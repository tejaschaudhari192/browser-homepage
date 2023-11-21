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
    const apiKey = '8d0892ff7ff24a1390e9ee93ffd916de';
    const city = 'shirpur';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherTemp = (data.main.temp - 273.15).toFixed(2);

            const weatherIcon = getWeatherIcon(data.weather[0].icon);

            const weatherString = `${weatherIcon} ${weatherTemp}°C`;
            document.getElementById('weather').textContent = weatherString;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').textContent = 'net chalu kr';
        });
}

function getWeatherIcon(iconCode) {

    const iconMap = {
        '01d': '☀️',
        '01n': '🌙',
        '02d': '⛅',
        '02n': '☁️',
        '03d': '☁️',
        '03n': '☁️',
        '04d': '☁️',
        '04n': '☁️',
        '09d': '🌧️',
        '09n': '🌧️',
        '10d': '🌦️',
        '10n': '🌧️',
        '11d': '⛈️',
        '11n': '⛈️',
        '13d': '❄️',
        '13n': '❄️',
        '50d': '🌫️',
        '50n': '🌫️'
    };

    return iconMap[iconCode] || '❓ nhi pta' 
}


setInterval(updateClock, 1000);

