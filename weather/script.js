const API_KEY = "b9995a14c17333fe5fe95aca2292198c"; 
const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");
const historyList = document.getElementById("history");
const logs = document.getElementById("logs");

btn.addEventListener("click", fetchWeather);

function log(msg){
logs.innerHTML += msg + "<br>";
}

async function fetchWeather(){

const city = cityInput.value;

if(city === ""){
alert("Enter city name");
return;
}

try{

log("1. Button Clicked");

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);

log("2. Fetch Request Sent");

const data = await response.json();

if(data.cod !== 200){
throw new Error(data.message);
}

log("3. Data Received");

displayWeather(data);
saveHistory(city);

}catch(error){

result.innerHTML = "Error: " + error.message;
}

}

function displayWeather(data){

const city = data.name;
const temp = data.main.temp;
const condition = data.weather[0].main;

result.innerHTML = `
<h3>${city}</h3>
<p>Temperature: ${temp} °C</p>
<p>Condition: ${condition}</p>
`;

}

function saveHistory(city){

let history = JSON.parse(localStorage.getItem("cities")) || [];

if(!history.includes(city)){
history.push(city);
localStorage.setItem("cities", JSON.stringify(history));
}

showHistory();

}

function showHistory(){

historyList.innerHTML = "";

let history = JSON.parse(localStorage.getItem("cities")) || [];

history.forEach(city => {

let li = document.createElement("li");
li.textContent = city;

li.onclick = function(){
cityInput.value = city;
fetchWeather();
}

historyList.appendChild(li);

});

}

showHistory();