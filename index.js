const submitBtn = document.querySelector('.submit')
submitBtn.addEventListener('click', getCoord)

//controller

async function getCoord() {
    try {
        const city = document.getElementById('city').value
        const state = document.getElementById('state').value
        const link = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + 'US&limit=1&appid=cdbda3b0e3efc59ea8cbf0e6837108f2'
        const response = await fetch(link,
            {mode: 'cors'}); 
        const data = await response.json();
        getWeather(data[0].lat, data[0].lon)
    } catch (error) {
        printError(error)
    }
}

async function getWeather(lat, lon) {
    try {
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=cdbda3b0e3efc59ea8cbf0e6837108f2&units=imperial'
        const response = await fetch(url,
            {mode: 'cors'});
            const data = await response.json();
            displayData(data.clouds.all, data.main.humidity, data.main.temp, data.wind.speed, data.weather[0].description, data.name, data.weather[0].icon)
            getBG(data.weather[0].main)
    } catch (error) {
        printError(error)
    }
}

//DOM
const printError = (error) => {
    document.querySelector('.content').innerText = error
}

const displayData = (cloudiness, humidity, temp, windSpeed, description, city, icon) => {
    const first = document.getElementById('first')
    const second = document.getElementById('second')
    const third = document.getElementById('third')
    const fourth = document.getElementById('fourth')
    document.querySelector('.content').style.padding = "18px";
    document.querySelector('.content').style.border= "2px solid black";
    

    first.innerText = ` ${city}`
    displayIcon(first, icon)

    second.innerText = `${temp}°F`

    third.innerText = `Humidity: ${humidity}%
    Cloudiness: ${cloudiness}%
    Wind Speed: ${windSpeed} mph`

    fourth.innerText = `Expect ${description}`
}

const displayIcon = (div, icon) => {
    const source = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
    let img = document.createElement('img')
    img.src = source
    div.appendChild(img)
}

const getBG = (bg) => {
    if (bg === 'Thunderstorm') {
        //Photo by <a href="https://unsplash.com/es/@mantasos?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tasos Mansour</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        document.body.style.backgroundImage = 'url(imgs/thunderstorm.jpg)'
    } else if (bg === 'Drizzle') {
        //Photo by <a href="https://unsplash.com/@thommilkovic?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Thom Milkovic</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          document.body.style.backgroundImage = 'url(imgs/drizzle.jpg)'
    } else if (bg === 'Rain') {
        //Photo by <a href="https://unsplash.com/@kevin_w_?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kevin Wang</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          document.body.style.backgroundImage = 'url(imgs/rain.jpg)'
    } else if (bg === 'Snow') {
        //Photo by <a href="https://unsplash.com/@aaronburden?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Aaron Burden</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          document.body.style.backgroundImage = 'url(imgs/snow.jpg)'
    } else if (bg === 'Clear') {
        //Photo by <a href="https://unsplash.com/ja/@spencer_demera?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Spencer DeMera</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          document.body.style.backgroundImage = 'url(imgs/clear.jpg)'
    } else if (bg === 'Clouds') {
        //Photo by <a href="https://unsplash.com/@billy_huy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Billy Huynh</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          document.body.style.backgroundImage = 'url(imgs/clouds.jpg)'
    } else if (bg === 'Mist' || bg === 'Haze' || bg === 'Fog' ||bg === 'Smoke') {
        //Photo by <a href="https://unsplash.com/@sgodfrey?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Simon Godfrey</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          document.body.style.backgroundImage = 'url(imgs/mist.jpg)'
    }
}

