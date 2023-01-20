
key = "f22d12ba1b50d6fbe65d82aebbf4ba73"


let weatherDiv = document.querySelector(".weater__forecast");
let weatherMain = document.querySelectorAll(".weather__main")
let cityInput = document.querySelector("#cityInput");
let cityBtn = document.querySelector("#input");
let weatherwrapperforceveralDays = document.querySelectorAll(".weather__main-forecast");
let weatherDay = document.querySelectorAll(".weather__main-date");
let footerBtnFooter3 = document.querySelector(".footer__btn-more-3");
// let footerBtnFooter5 = document.querySelector(".footer__btn-more-5");

function convertion(val) {
    return Math.round((val - 273).toFixed(2))
}

weatherIcon = (data) => {
    if (data.toLowerCase() == "Snow".toLowerCase()) {
        return "weatherIcons/snow.svg"
    }
    if (data.toLowerCase() == "rain".toLowerCase()) {
        return "weatherIcons/rain.svg"
    }
    if (data.toLowerCase() == "thunderstorm".toLowerCase()) {
        return "weatherIcons/storm.svg"
    }
    if (data.toLowerCase() == "Clouds".toLowerCase()) {
        return "weatherIcons/Clouds.svg"
    }
    if (data.toLowerCase() == "drizzle".toLowerCase()) {
        return "weatherIcons/Drizzle.svg"
    }
    if (data.toLowerCase() == "Clear".toLowerCase()) {
        return "weatherIcons/Clear.svg"
    }
    else {
        return "weatherIcons/else.svg"
    }
}
weatherIconForSerevalDays = (data, i)=>{
    let time = (data.list[i].dt_txt).slice(11, 13);
    main = data.list[i].weather[0].main;
    if (main.toLowerCase() == "Snow".toLowerCase()) {
        return "weatherForSeveralDays/snow.svg"
    }
    if (main.toLowerCase() == "rain".toLowerCase()) {
        return "weatherForSeveralDays/rain.svg"
    }
    if (main.toLowerCase() == "thunderstorm".toLowerCase()) {
        return "weatherForSeveralDays/storm.svg"
    }
    if (main.toLowerCase() == "Clouds".toLowerCase()) {
        return "weatherForSeveralDays/Clouds.svg"
    }
    if (main.toLowerCase() == "drizzle".toLowerCase()) {
        return "weatherForSeveralDays/Drizzle.svg"
    }
    if (main.toLowerCase() == "Clear".toLowerCase()) {
        if((time=="00" || time =="03")){
            return "weatherForSeveralDays/clearMoon.svg"
        }if(time=="21" || time=="18"){
            return "weatherForSeveralDays/SunAndMoom.svg"
        }
        else{
            return "weatherForSeveralDays/Clear.svg"
        }
    }
    else {
        return "weatherForSeveralDays/else.svg"
    }
}
timeSlice = (val) => val.slice(10, 16)

getWeekday=(data, i)=>{
    let date = new Date(data.list[i].dt_txt);
    let d = date.getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for(let i =0;i<days.length;i++){
    if(i==d){
        return(days[i])
    }
    }
}

getMonth=(data, i)=>{
    let date = new Date(data.list[i].dt_txt);
    let d = date.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for(let i =0;i<months.length;i++){
    if(i==d){
        return(months[i])
    }
    }
}

getDayTime=(data, i)=>{
    let time = (data.list[i].dt_txt).slice(11, 13);
    console.log(time)
    if(time == "03" || time == "00"){
        return "night"
    }
    if(time == "09"|| time == "06"){
        return "morning"
    }
    if(time == "15" || time == "12"){
        return "day"
    }
    if(time == "21" || time =="18"){
        return "evening"
    }

}

cityBtn.addEventListener("click", function (e) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&cnt=8&appid=f22d12ba1b50d6fbe65d82aebbf4ba73`)
        .then(res => res.json())
        .then(data => {
            document.querySelector(".weather__city-name").innerHTML = cityInput.value;
            weatherMain[0].style.cssText = `
            background-image: url(weather_bc.png);
            background-repeat: no-repeat;
            min-height: 192px;`;
            weatherMain[0].innerHTML = `
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

let creatWeatherforseveralDays = (data, num) => {
    let dateAll = new Date();
    let date = 0;
    let day = dateAll.getDate();
    weatherDay[0].innerHTML=" ";
    weatherDay[1].innerHTML=" ";
    weatherDay[2].innerHTML=" ";
    weatherwrapperforceveralDays[0].innerHTML =" ";
    weatherwrapperforceveralDays[1].innerHTML =" ";
    weatherwrapperforceveralDays[2].innerHTML =" ";
    for (let i = 0; i < 30; i += 2) {
        date = ((data.list[i].dt_txt).slice(8, 11));
        if (+(day + 1) == date) {
            weatherDay[0].innerHTML = `<h5 class="weather__main-title">${getWeekday(data, i)}</h5>
            <p class="weather__main-num">${date}</p>
            <p class="weather__main-month">${getMonth(data, i)}</p>`
            weatherwrapperforceveralDays[0].innerHTML += `
            <div class="weather__main-weather">
                                        <p class="weather__main-time">${getDayTime(data, i)}</p>
                                        <img src="${weatherIconForSerevalDays(data, i)}" alt="">
                                        <div class="weather__main-temp-wrapper">
                                            <p class="weather__main-min">min: ${convertion(data.list[i].main.temp_min)}</p>
                                            <p class="weather__main-max">max: ${convertion(data.list[i].main.temp_max)}</p>
                                        </div>
                                        <div class="weather__main-feelslike-wrapper">
                                            <p class="weather__main-feelslike">feels like: ${convertion(data.list[i].main.feels_like)}</p>
                                            <p class="weather__main-main">${data.list[i].weather[0].main}</p>
                                        </div>
                                    </div>
            `
        }
        if (+(day + 2) == date) {
            weatherDay[1].innerHTML = `<h5 class="weather__main-title">${getWeekday(data, i)}</h5>
            <p class="weather__main-num">${date}</p>
            <p class="weather__main-month">${getMonth(data, i)}</p>`
            weatherwrapperforceveralDays[1].innerHTML += `
            <div class="weather__main-weather">
                                        <p class="weather__main-time">${getDayTime(data, i)}</p>
                                        <img src="${weatherIconForSerevalDays(data, i)}" alt="">
                                        <div class="weather__main-temp-wrapper">
                                            <p class="weather__main-min">min: ${convertion(data.list[i].main.temp_min)}</p>
                                            <p class="weather__main-max">max: ${convertion(data.list[i].main.temp_max)}</p>
                                        </div>
                                        <div class="weather__main-feelslike-wrapper">
                                            <p class="weather__main-feelslike">feels like: ${convertion(data.list[i].main.feels_like)}</p>
                                            <p class="weather__main-main">${data.list[i].weather[0].main}</p>
                                        </div>
                                    </div>
            `
        }
        if (+(day + 3) == date) {
            weatherDay[2].innerHTML = `<h5 class="weather__main-title">${getWeekday(data, i)}</h5>
            <p class="weather__main-num">${date}</p>
            <p class="weather__main-month">${getMonth(data, i)}</p>`
            weatherwrapperforceveralDays[2].innerHTML += `
            <div class="weather__main-weather">
                                        <p class="weather__main-time">${getDayTime(data, i)}</p>
                                        <img src="${weatherIconForSerevalDays(data, i)}" alt="">
                                        <div class="weather__main-temp-wrapper">
                                            <p class="weather__main-min">min: ${convertion(data.list[i].main.temp_min)}</p>
                                            <p class="weather__main-max">max: ${convertion(data.list[i].main.temp_max)}</p>
                                        </div>
                                        <div class="weather__main-feelslike-wrapper">
                                            <p class="weather__main-feelslike">feels like: ${convertion(data.list[i].main.feels_like)}</p>
                                            <p class="weather__main-main">${data.list[i].weather[0].main}</p>
                                        </div>
                                    </div>
            `
        }

        if ((+(day + 4) == date)&&(num==5)) {
            weatherDay[3].innerHTML = `<h5 class="weather__main-title">${getWeekday(data, i)}</h5>
            <p class="weather__main-num">${date}</p>
            <p class="weather__main-month">${getMonth(data, i)}</p>`
            weatherwrapperforceveralDays[3].innerHTML += `
            <div class="weather__main-weather">
                                        <p class="weather__main-time">${getDayTime(data, i)}</p>
                                        <img src="${weatherIconForSerevalDays(data, i)}" alt="">
                                        <div class="weather__main-temp-wrapper">
                                            <p class="weather__main-min">min: ${convertion(data.list[i].main.temp_min)}</p>
                                            <p class="weather__main-max">max: ${convertion(data.list[i].main.temp_max)}</p>
                                        </div>
                                        <div class="weather__main-feelslike-wrapper">
                                            <p class="weather__main-feelslike">feels like: ${convertion(data.list[i].main.feels_like)}</p>
                                            <p class="weather__main-main">${data.list[i].weather[0].main}</p>
                                        </div>
                                    </div>
            `
        }
        if ((+(day + 5) == date)&&(num==5)) {
            weatherDay[4].innerHTML = `<h5 class="weather__main-title">${getWeekday(data, i)}</h5>
            <p class="weather__main-num">${date}</p>
            <p class="weather__main-month">${getMonth(data, i)}</p>`
            weatherwrapperforceveralDays[4].innerHTML += `
            <div class="weather__main-weather">
                                        <p class="weather__main-time">${getDayTime(data, i)}</p>
                                        <img src="${weatherIconForSerevalDays(data, i)}" alt="">
                                        <div class="weather__main-temp-wrapper">
                                            <p class="weather__main-min">min: ${convertion(data.list[i].main.temp_min)}</p>
                                            <p class="weather__main-max">max: ${convertion(data.list[i].main.temp_max)}</p>
                                        </div>
                                        <div class="weather__main-feelslike-wrapper">
                                            <p class="weather__main-feelslike">feels like: ${convertion(data.list[i].main.feels_like)}</p>
                                            <p class="weather__main-main">${data.list[i].weather[0].main}</p>
                                        </div>
                                    </div>
            `
        }
    }
}


footerBtnFooter3.addEventListener("click", function(e){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&cnt=30&appid=f22d12ba1b50d6fbe65d82aebbf4ba73`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            creatWeatherforseveralDays(data, 3)
        })

        if(footerBtnFooter3.classList.contains("footer__btn-more-active")){
            footerBtnFooter3.classList.remove("footer__btn-more-active")
        }
})


// footerBtnFooter5.addEventListener("click", function(){
//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Lviv&cnt=50&appid=f22d12ba1b50d6fbe65d82aebbf4ba73`)
//         .then(res => res.json())
//         .then(data => {
//             // console.log(data);
//             creatWeatherforseveralDays(data, 5)
//         })
// })











const footerBtn = document.querySelector(".footer__btn");
const footerBtnMore3 = document.querySelector(".footer__btn-more-3");
const footerBtnMore5 = document.querySelector(".footer__btn-more-5");
footerBtn.addEventListener("click", footer);

function footer(event) {
    if (event.target.closest('.footer__btn')) {
        footerBtnMore3.classList.toggle('footer__btn-more-active');
    }
}
