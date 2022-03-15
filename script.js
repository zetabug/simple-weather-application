const locationBtn = document.querySelector(".location_btn"),
  display = document.querySelector(".display_container");

locationBtn.addEventListener("click", function getLocation() {
  display.innerHTML = `<h3>Loading...</h3>`;

  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(requestApi);
  } else {
    alert("Geolocation is not supported by this browser.");
    display.innerHTML = `<h3>Error...</h3>`;
  }
});

function requestApi(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  (async () => {
    // first
    const res = await fetch(
      `https://apis.mapmyindia.com/advancedmaps/v1/752e7f201e4ce48953d003df1b5f2ec3/rev_geocode?lat=${latitude}&lng=${longitude}`
    );
    const result1 = await res.json();

    // second
    const res2 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b4771aee9e360c1ee7c856415f092e4a`
    );
    const result2 = await res2.json();

    displayLocation(result1);
    displayAll(result2);
  })();
}

function displayLocation(info) {
  const city = info.results[0].city;
  const district = info.results[0].district;
  const state = info.results[0].state;

  display.innerHTML = ``;
  if (city !== "") {
    display.innerHTML = `<h3 class="location_container">${city}, ${state}</h3>`;
  } else {
    display.innerHTML = `<h3 class="location_container">${district}, ${state}</h3>`;
  }
}

function displayAll(data) {
  const main = data.weather[0].main;
  const sky = data.weather[0].description;
  const temp = data.main.temp - 273.15;
  const humid = data.main.humidity;

  //   Inserting Icons ================display====
  if (main == "Clear") {
    display.innerHTML += `<img src="./Weather Icons/clear.svg" class="icon">`;
  } else if (main == "Clouds") {
    display.innerHTML += `<img src="./Weather Icons/cloud.svg" class="icon">`;
  } else if (main == "Rain" || main == "Drizzle") {
    display.innerHTML += `<img src="./Weather Icons/rain.svg" class="icon">`;
  } else if (main == "Thunderstorm") {
    display.innerHTML += `<img src="./Weather Icons/storm.svg" class="icon">`;
  } else if (main == "Snow") {
    display.innerHTML += `<img src="./Weather Icons/snow.svg" class="icon">`;
  } else if (
    main == "Mist" ||
    main == "Smoke" ||
    main == "Haze" ||
    main == "Dust" ||
    main == "Fog" ||
    main == "Sand" ||
    main == "Ash" ||
    main == "Squall" ||
    main == "Tornado"
  ) {
    display.innerHTML += `<img src="./Weather Icons/haze.svg" class="icon">`;
  }

  //   ====================================

  display.innerHTML += `<h3 class="description">${sky}</h3>
  
                      <div class="details_container">
                        <div class="temp">Temperature :
                          <span class="number">${temp.toFixed(2)} °C</span>
                            </div>
                              <div class="humid">Humidity :
                                  <span class="percent">${humid}%</span>
                              </div>
                            </div>`;
}
