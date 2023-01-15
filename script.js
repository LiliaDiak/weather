key = "f22d12ba1b50d6fbe65d82aebbf4ba73"


let weatherDiv = document.querySelector(".weater__forecast");
let weatherCurrent = document.querySelector(".weather__current")
let cityInput = document.querySelector("#cityInput");
let cityBtn = document.querySelector("#input");


function convertion(val) {
    return Math.round((val - 273).toFixed(2))
}

weatherIcon = (data)=>{
    if(data.toLowerCase() == "Snow".toLowerCase()){
        return "weatherIcons/snow.svg"
    }
    if(data.toLowerCase() == "rain".toLowerCase()){
        return "weatherIcons/rain.svg"
    }
    if(data.toLowerCase() == "thunderstorm".toLowerCase()){
        return "weatherIcons/storm.svg"
    }
    if(data.toLowerCase() == "Clouds".toLowerCase()){
        return "weatherIcons/Clouds.svg"
    }
    if(data.toLowerCase() == "drizzle".toLowerCase()){
        return "weatherIcons/Drizzle.svg"
    }
    if(data.toLowerCase() == "Clear".toLowerCase()){
        return "weatherIcons/Clear.svg"
    }
    else{
        return "weatherIcons/else.svg"
    }
}
timeSlice = (val) => val.slice(10, 16)

cityBtn.addEventListener("click", function () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&cnt=8&appid=f22d12ba1b50d6fbe65d82aebbf4ba73`)
        .then(res => res.json())
        .then(datas => {
            console.log(datas)
        })
})



cityBtn.addEventListener("click", function () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&cnt=8&appid=f22d12ba1b50d6fbe65d82aebbf4ba73`)
        .then(res => res.json())
        .then(data => {
            document.querySelector(".weather__city-name").innerHTML = cityInput.value;
            weatherCurrent.style.cssText= `
            background-image: url(weather_bc.png);
            background-repeat: no-repeat;
            min-height: 192px;`;
            weatherCurrent.innerHTML= `
            <div class="weather__current-wrapper">
            <div class="weather__current-up">
                <p class="weather__current-temp">${convertion(data.main.temp)}°</p>
                <img src="${weatherIcon(data.weather[0].main)}" alt="" class="weather__current-icon">
            </div>
            <div class="weather__current-dowm">
                <div class="weather__current-feels__like">
                    <p class="today__feels-like">feels like: ${convertion(data.main.feels_like)}°</p>
                    <p class="today__city">${data.sys.country}, ${cityInput.value}</p>
                </div>
                <p class="main">${data.weather[0].main}</p>
            </div>
        </div>`
        })
})


// fetch('https://api.openweathermap.org/data/2.5/forecast?q=london&cnt=3&appid=f22d12ba1b50d6fbe65d82aebbf4ba73')
//     .then(res => res.json())
//     .then(data => {
//         for (let i = 0; i < data.list.length; i++) {
//             weatherDiv.innerHTML += `
//             <div class="weather__forecast-today">
//             <div class="weather__forecast-data">
//                 <p class="data">Time : ${timeSlice(data.list[i].dt_txt)}</p>
//                 <img class="icon" src="" alt="">
//             </div>
//                 <div class="weather__forecast-weather">
//                     <p class="weather__temp">${convertion(data.list[i].main.temp)}</p>
//                     <p class="weather__feels-like">feels like : ${convertion(data.list[i].main.feels_like)}</p>
//                 </div>
//         </div>
//             `
//         }
//     })












const footerBtn = document.querySelector(".footer__btn");
const footerBtnMore3 = document.querySelector(".footer__btn-more-3");
const footerBtnMore5 = document.querySelector(".footer__btn-more-5");
footerBtn.addEventListener("click", footer);

function footer(event) {
    if (event.target.closest('.footer__btn')) {
        footerBtnMore3.classList.toggle('footer__btn-more-active');
        footerBtnMore5.classList.toggle('footer__btn-more-active');
    }
}