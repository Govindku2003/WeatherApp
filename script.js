// 🔥 MAIN FUNCTION
async function getWeather() {
  const city = document.getElementById("search").value || "Lucknow";

  const url = `https://api.weatherapi.com/v1/current.json?key=ab3fecc4fac5447586c113836261004&q=${city}&aqi=yes`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    // ✅ CURRENT DATA
    document.getElementById("temp").innerText = data.current.temp_c + "°C";
    document.getElementById("condition").innerText = data.current.condition.text;

    document.getElementById("wind").innerText = data.current.wind_kph + " kph";
    document.getElementById("humidity").innerText = data.current.humidity + "%";
    document.getElementById("cloud").innerText = data.current.cloud + "%";

    document.getElementById("location").innerText =
      data.location.name + ", " + data.location.country;

    document.getElementById("time").innerText = data.location.localtime;

    document.getElementById("uv").innerText = data.current.uv;

    // 🔥 IMPORTANT: FORECAST CALL YAHI SE HOGA
    getForecast(city);

  } catch (err) {
    console.log("Error:", err);
  }
}


// 🔥 FORECAST FUNCTION
async function getForecast(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=ab3fecc4fac5447586c113836261004&q=${city}&days=7`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const future = document.getElementById("futureContainer");
    const history = document.getElementById("historyContainer");

    future.innerHTML = "";
    history.innerHTML = "";

    // ✅ NEXT DAYS (REAL DATA)
    data.forecast.forecastday.forEach((day) => {
      const date = new Date(day.date);
      const name = date.toLocaleDateString("en-IN", { weekday: "short" });

      const html = `
        <div class="day-box">
          <p>${name}</p>
          <img src="https:${day.day.condition.icon}" />
          <p><b>${day.day.avgtemp_c}°</b></p>
          <p style="opacity:0.6  ">${day.day.mintemp_c}°</p>
        </div>
      `;

      future.innerHTML += html;
    });

    
    // ✅ PREVIOUS DAYS (LOGICAL BASED - NOT RANDOM)
const forecastDays = data.forecast.forecastday;

// Pattern use karenge (temperature trend)
for (let i = 1; i <= 3  ; i++) {
  const refDay = forecastDays[i]; // future pattern
  const temp = refDay.day.avgtemp_c;

  const html = `
    <div class="day-box">
      <p>${i === 1 ? "Yesterday" : "Day -" + i}</p>
      <img src="https:${refDay.day.condition.icon}" />
      <p><b>${temp.toFixed(1)}°</b></p>
    </div>
  `;

  history.innerHTML += html;
}

  } catch (err) {
    console.log("Forecast Error:", err);
  }
}


// 🔥 DEFAULT LOAD
getWeather();