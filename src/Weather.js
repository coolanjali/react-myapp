import React, { useState } from "react";
import axios from "axios";
export default function Weather() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  let [description, setDescription] = useState(null);
  let [loaded, setLoaded] = useState(false);
  function callTemperature(response) {
    setTemperature(response.data.main.temp);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setDescription(response.data.weather.description);
    setIcon({
      Icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
    setLoaded(true);
  }

  function changeForm(event) {
    event.preventDefault();
    let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(callTemperature);
  }
  function changeCity(event) {
    setCity(event.target.value);
  }

  let Form = (
    <form onSubmit={changeForm}>
      <input type="search" onChange={changeCity} />
      <input type="submit" value="Search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {Form}
        <ul className="showMe">
          <li>Temperature :{Math.round(temperature)} °C</li>
          <li>Wind : {Math.round(wind)} Km/h</li>
          <li>Description :{description}</li>
          <li>Humidity :{Math.round(humidity)} %</li>
          <li>
            <img src={icon.Icon} alt={setDescription.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return Form;
  }
}