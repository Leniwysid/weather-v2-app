import axios from "axios";
import React, { useEffect, useState } from "react";
import foto from "./assets/foto.jpg";

function App() {
  const [data, setData] = useState({});
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [status, setStatus] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=807d004e98ade9ef529a71c7e287eea0&units=metric`;

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geoloc uis not supported by ur browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        () => {
          setStatus("unable to retrive ur location");
        }
      );
    }
  };

  const location = () => {
    axios.get(url).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getLocation();
    location();
  }, []);
  return (
    <div className="w-full h-full relative">
      <img className="w-full h-screen object-cover" src={foto} alt="/" />
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/20"></div>
      <div className="absolute w-full text-white top-10 flex flex-col mx-auto text-3xl">
        <div className=" justify-between text-center ">
          <div className="max-w-[1240px] sm:h-[700px] h-[500px] mx-auto ">
            <p>{status}</p>
            <p className="mt-10 text-4xl">{data.name}</p>
            {data.main ? (
              <h1 className="text-8xl p-4">{data.main.temp.toFixed()} ℃</h1>
            ) : (
              ""
            )}
            {data.main ? (
              <p className="absolute rotate-90 mt-10 sm:right-5 right-0">
                {data.weather[0].main}
              </p>
            ) : (
              ""
            )}
          </div>
          {data.main ? (
            <div className="flex justify-evenly max-w-[700px] mx-auto rounded-lg p-3  bg-gray-900/70">
              <div>
                {data.main ? (
                  <p className="sm:font-bold">
                    {data.main.feels_like.toFixed()} ℃
                  </p>
                ) : (
                  ""
                )}
                <p className="sm:text-2xl text-xl">Feels like</p>
              </div>
              <div>
                {data.main ? (
                  <p className="sm:font-bold">{data.main.humidity} %</p>
                ) : (
                  ""
                )}
                <p className="sm:text-2xl text-xl">Humidity</p>
              </div>
              <div>
                {data.wind ? (
                  <p className="sm:font-bold">
                    {data.wind.speed.toFixed()} KMH
                  </p>
                ) : (
                  ""
                )}
                <p className="sm:text-2xl text-xl">Wind speed</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
