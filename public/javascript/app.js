//import { addListener } from "cluster";


document.getElementById("form").addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log("Prevented refresh")
})

console.log("hello")

let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize");
  console.log("resizing");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize");
  }, 400);
});

new Promise(()=>{console.log("hello")})
    .then(console.log("goodbye"))

if(window.location == "http://localhost:3000/"){
const Get = (location, callback) => {
    document.getElementById("city").textContent = `Loading...`;
    document.getElementById("country").textContent = ``;
    document.getElementById("cT").textContent = `Temperature: `;
    document.getElementById("cFL").textContent = `Feels like: `;
    document.getElementById("cH").textContent = `Humidity: `;
    document.getElementById("cP").textContent = `Pressure: `;
    console.log(`http://localhost:3000/weather/?location=${location}`)
    fetch(`http://localhost:3000/weather/?location=${location}`).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            console.log(`error: ${data.error}`)
            document.getElementById("city").textContent = data.error
        }
        else{
            //console.log(data)
            callback(data);
        }
    }).catch((error)=>console.log(error))
})}

document.getElementById("formButton").addEventListener("click", ()=>{
    let nameValue = document.getElementById("lInput").value
    console.log(nameValue);
    Get(nameValue, (data)=>{
        console.log(data)
        document.getElementById("city").textContent = `${data.weather.location.name}, `;
        document.getElementById("country").textContent = `${data.weather.location.country}`;
        document.getElementById("cT").textContent = `Temperature: ${data.weather.current.temperature}`;
        document.getElementById("cFL").textContent = `Feels like: ${data.weather.current.feelslike}`;
        document.getElementById("cH").textContent = `Humidity: ${data.weather.current.humidity}`;
        document.getElementById("cP").textContent = `Pressure: ${data.weather.current.pressure}`;
        document.getElementById("compassArrow").style.transform = `translate(-50%,0) rotate(${data.weather.current.wind_degree}deg)`;
    });
})
}

document.getElementById("HomeButton").addEventListener("click", ()=>{
    console.log("clicked")
    window.location.assign("http://localhost:3000")
})
document.getElementById("AboutButton").addEventListener("click", ()=>{
    console.log("clicked")
    window.location.assign("http://localhost:3000/about")
})
document.getElementById("HelpButton").addEventListener("click", ()=>{
    console.log("clicked")
    window.location.assign("http://localhost:3000/help")
})

//console.log(window.location.href)
let activeURL = window.location.href.replace("http://localhost:3000/", "");
if (activeURL == ""){
    document.getElementById(`homeB`).classList.add("active");

}
else{
    if (document.getElementById(`${activeURL}B`) != null){
        document.getElementById(`${activeURL}B`).classList.add("active");
    }
}
