const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const h3 = document.querySelector("h3");


// input.addEventListener("GetInfo()",display);
// call both time 
function city_name() {
    const newName = document.getElementById("cityInput").value;
    getFutureForcastData(newName)
    // const cityName= document.getElementById("cityName");
    //  cityName.innerHTML="--"+newName.value+"--"
}

function display() {
    localStorage.setItem('newName', input.value);
    h3 = localStorage.getItem('newName');
    console.log(localStorage.getItem('newName'));
}
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



function CheckDay(days) {
    if (days + time.getDay() > 6) {
        return days + time.getDay() - 7
    }
    else {
        return days + time.getDay();
    }
}
//console.log(CheckDay);
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + '' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);

const API_KEY = '5657df8791b81f5bcce648257200e552';
//getWeatherData()
//future
function getFutureForcastData(city_name) {
    //const city_name= document.getElementById("cityInput");
    navigator.geolocation.getCurrentPosition((success) => {
        // console.log(success);
        let { latitude, longitude } = success.coords;
        //api add city name but need space
        fetch(
            //`https://api.openweathermap.org/data/2.5/forecast?lat={latitude}&lon={longitude}&units=imerial&appid={API_KEY}`
            `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=imperial&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                //futureCast(data)

                console.log("beginning: ",data)
                //return showWeatherData(data);

                getFiveDaysForcast(data.list)
                showWeatherData(data)
            })


    })
}

function getFiveDaysForcast(daily) {
    let result = [];
    let x = moment().add(1, 'day').startOf('day').unix();
    let y = moment().add(6, 'day').startOf('day').unix();
    for (let i = 0; i < daily.length; i++) {
        //console.log("RESPONSE: ", data.list[i])
        if (daily[i].dt >= x && daily[i].dt < y) {
            if (daily[i].dt_txt.slice(11, 13) == "12") {
                //console.log("RES: ", daily[i])
                result.push(daily[i])
                console.log("RESULT: ", result)
                result.forEach((el) => {
                    loadDom(el)
                });        
            }
        }
    }
}

function loadDom (x) {
    let game = `
                                <div class="other">
                                <img src="http://openweathermap.org/img/wn/${x.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                                <div class="day">${window.moment(x.dt * 1000).format('ddd')}</div>
                                <div>${x.main.temp}&#176;</div>
                                </div>
    
                                `
                                let mainEl = document.createElement("div")
                                mainEl.innerHTML = game;
                              // console.log("GAME: ", game);
                               console.log("MAINEL: ", mainEl);
                                return weatherForecastEl.appendChild(mainEl)
                               // return game;
}


// function futureCast(data) {
//     let otherDayForcast = ''
//     for (i = 0; i < data.length; i++) {
//         otherDayForcast.innerHTML +=

//             `
//         <div class="weather-forecast-item">
//         <div class="day">${day}</div>
//         <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
//         <div class="temp"> {temp}${day.main.temp}&#176;</div>
        
//                             </div>
//                             <div class="weather-forecast-item">
//                 <div class="day">${day}</div>
//                 <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
//                 <div class="temp">${temp}&#176;</div>
//                 </div>
//             <div class="weather-forecast-item">
//             <div class="day">${day}</div>
//                 <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
//                 <div class="temp">${temp}&#176;</div>

//             </div>
//             <div class="weather-forecast-item">
//             <div class="day">${day}</div>
//                 <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
//                 <div class="temp">${temp}&#176;</div>
//             </div>
//             <div class="weather-forecast-item">
//             <div class="day">${day}</div>
//                 <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
//                 <div class="temp">${temp}&#176;</div>
//                 </div>
//                 `

//     }

// }
// function today API
function showWeatherData(data) {
    //console.log("SWD: ", data)
    let { humidity, pressure, temp } = data.list[0].main;
   // let { speed } = data.weather.wind;

    currentWeatherItemsEl.innerHTML =
        `<div class="weather-item">
    <div>humidity</div>
    <div>${humidity}%</div>
    </div>
    <div class="weather-item">
    <div>pressure</div>
    <div>${pressure}</div>
    </div>
    <div class="weather-item">
    <div>wind speed</div>
    <div></div>
    </div>`;

}

// var test = [
//     "<h1>Hello World!</h1>",
//     "<h1>Hello World!</h1>",
//     "<h1>Hello World!</h1>",
//     "<h1>Hello World!</h1>"
// ]

// for (let i = 0; i < test.length; i++) {
//     var test1 = document.createElement("div")
//     test1.innerHTML = test[i]
//     console.log(test1);
//     weatherForecastEl.appendChild(test1)
// }



