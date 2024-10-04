const forcasts = document.getElementById('forcasts')
const base = 'https://api.open-meteo.com/v1'

const locations = {
    "Gjøvik": { lat: 60.7957, lon: 10.6915 },
    "Notodden": { lat: 59.5594, lon: 9.2585 },
    "Longyerbyen": { lat: 78.2233, lon: 15.6469 },
    "Kyoto": { lat: 35.0211, lon: 135.7538 },
    "Asakusa": { lat: 35.7169, lon: 139.7957 }
};


async function getWether() {
    let container = '';
    for (const [locationName, location] of Object.entries(locations)) {
        try {
            const response = await fetch(`${base}/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`);
            const post = await response.json();
            container += `
                <div>
                    <h2>${locationName}</h2>
                    <h3>
                        ${post.current_weather.temperature}${post.current_weather_units.temperature}
                    </h3>
                    <img src="${getDescription(post.current_weather.weathercode, post.current_weather.is_day).image}">
                    <p>
                        ${getDescription(post.current_weather.weathercode, post.current_weather.is_day).description}
                    </p>
                    <img id="arrow" style="transform: rotate(${post.current_weather.winddirection}deg);" src="arrow.svg">
                    <h4>
                        ${post.current_weather.windspeed}${post.current_weather_units.windspeed}
                    </h4>
                </div>
                `;
        } catch (error) {
            forcasts.innerHTML = '<p>Faild to fetch the post</p>';
            console.error(error);
        };
    };
    forcasts.innerHTML = container;
};

getWether();
setInterval(getWether, 30000);

function getDescription(weathercode, is_day) {
    const weather = descriptions[weathercode]
    if (is_day) {
        return weather.day
    } else {
        return weather.night
    }
};

