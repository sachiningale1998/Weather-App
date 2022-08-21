let wApikey = "cc4f46c623570bc0183451d67219999b" ;

let forecastdays = 7 ;

let day = [
    "Sun","Mon","Tue","Wed","Thur","Fri","Sat"
]

let month = [
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec"
];

let container = document.getElementById("container");

async function getWeather(){
    try{
        let city =document.getElementById("cityInput").value ;
        let res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc4f46c623570bc0183451d67219999b&units=metric`
        )
        let data = await res.json();
        // console.log('data: ', data);
        let latlong=[];
        let longi = data.coord.lon ;
        // console.log('lon: ', longi);
        
        let latti = data.coord.lat ;
        // console.log('lat: ', latti);

        latlong.push(longi,latti);
        let id = data.id ;
        // console.log('id: ', id);
        
        search7(data,latlong);
        appendInfo(data);
        appendinmap(data)

    }catch(error){
        // console.log('error: ', error);
    }
}
function appendInfo(data){

let display = (document.querySelector("#divup").innerHTML = null);
let div = document.createElement("div");
div.id = "display-info";

let div2 = document.createElement("div");
div2.id = "map-info";

let name = document.createElement("h3");
name.innerHTML = `<div>
      <i class="fa-solid fa-location-dot"></i><span> ${data.name}</span>
    </div>`;

    let temp = document.createElement("p");
temp.innerHTML = `<div><i class="fa-solid fa-temperature-half"></i>
      <span>${data.main.temp} <span><sup>o</sup>C</span></span>
    </div>`;

    let minMaxTemp = document.createElement("p");
minMaxTemp.innerHTML = `<div>
      <p>Range: (<i class="fa-solid fa-temperature-low"></i>${data.main.temp_min} <span><sup>o</sup>C</span> - <i class="fa-solid fa-temperature-high"></i>${data.main.temp_max} <span><sup>o</sup>C</span>)</p>
    </div>`;

    let wind = document.createElement("p");
wind.innerHTML = `<div>
      <i class="fa-solid fa-wind"></i><span>Wind: (speed- ${data.wind.speed}m/s, deg- ${data.wind.deg}<span><sup>o</sup>)</span></span>
    </div>`;
let icon = data.weather[0].icon;
let clouds = document.createElement("div");
clouds.innerHTML = `<div><img src="http://openweathermap.org/img/wn/${icon}.png" alt="${data.weather[0].description}"></div>`;


let sRise = new Date(data.sys.sunrise * 1000);
let sunrise = document.createElement("p");
sunrise.innerText = `Sunrise: ${sRise}`;

let sSet = new Date(data.sys.sunset * 1000);
let sunset = document.createElement("p");
sunset.innerText = `Sunset: ${sSet}`;


let div3 = document.createElement("div");
div3.id = "more-details";
div3.append(wind,sunrise,sunset);

div.append(name, temp, minMaxTemp, clouds, div3);

document.querySelector("#divup").append(div, div2);

}
async function search7(data,latlong){
try{
    let city = document.getElementById("cityInput").value ;
    let res1 = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latlong[1]}&lon=${latlong[0]}&appid=cc4f46c623570bc0183451d67219999b&units=metric`
    )
    let weekdata = await res1.json();
    //  console.log('weekdatafisrt: ', weekdata);

   let weekdata1 = weekdata.daily ;
    // console.log('weekdatadaily: ', weekdata1);
    

    let weekdata2 = [];
    for(let i=0 ; i<weekdata1.length -1; i++){
        weekdata2.push(weekdata1[i]);
    }
    appendData(weekdata2)

}catch(error){
    // console.log('error: ', error);

}  
}  


  function appendData(weekdata2){
    
      document.getElementById("divdown").innerHTML = "";
    weekdata2.map(function(element,index,arr){
        
    let div1 = document.createElement("div");
    div1.setAttribute("id","div1");

    let sDate = new Date(element.dt * 1000);

    let weeks = sDate.getDay();
    // console.log('weeks: ', weeks);

    let day1 = document.createElement("p");
    day1.innerText = day[weeks];

    let logo = document.createElement("img");
    logo.src = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png` ;

    let mintemp = document.createElement("p");
    mintemp.innerText = element.temp.min ;

    let maxtemp = document.createElement("p");
    maxtemp.innerText = element.temp.max


    div1.append(day1,logo,mintemp,maxtemp)

    document.getElementById("divdown").append(div1);
 })
}


function appendinmap(data){
 document.getElementById("citymap").innerHTML = null;

let div2 = document.createElement('div');
    div2.setAttribute('id',"div2");
    let iframe = document.createElement('iframe');
    iframe.src= `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    iframe.setAttribute('id',"iframe");

    div2.append(iframe);
    document.getElementById("citymap").append(div2);
}