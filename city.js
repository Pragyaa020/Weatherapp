const button=document.getElementById("searchbutton");
const city=document.getElementById("city");
const API_KEY1 ='49cc8c821cd2aff9af04c9f98c36eb74';


async function getData(cityname){
    const promise=await fetch(`http://api.weatherapi.com/v1/current.json?key=07dbc5d5b8f347d9b44134338241604&q=${cityname}&aqi=yes`);
    return await promise.json();
}
button.addEventListener("click",async ()=>{
    const data=(city.value);
    const result=await getData(data);
    console.log(result);
    const latitude=result.location.lat;
    const longitude=result.location.lon;
    getWeatherData(latitude,longitude);
    

});


    function getWeatherData(latitude, longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY1}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
    }
    
    function showWeatherData (data){
        let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    
        timezone.innerHTML = data.timezone;
        countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'
    
        currentWeatherItemsEl.innerHTML = 
        `<div class="weather-item">
            <div>Humidity</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${pressure}</div>
        </div>
        <div class="weather-item">
            <div>Wind Speed</div>
            <div>${wind_speed}</div>
        </div>
    
        <div class="weather-item">
            <div>Sunrise</div>
            <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
            <div>Sunset</div>
            <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
        </div>
        
        
        `;
    }

    button.addEventListener("click",
        getCoordinatesForCity(newyork)
        .then(coordinates => {
            console.log('Latitude:', coordinates.latitude);
            console.log('Longitude:', coordinates.longitude);
            // Now you can call getWeatherData with these coordinates
            getWeatherData1(coordinates.latitude, coordinates.longitude);
        })
        .catch(error => {
            console.error('Error finding coordinates:', error);
        })
    
    );
    