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
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude.toFixed(2));
          setLon(position.coords.longitude.toFixed(2));
        },
        () => {
          setStatus("unable to retrive your location");
        }
      );
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  const location = () => {
    axios.get(url).then((res) => {
      setData(res.data);
      console.log(res.data);
      console.log(lat);
      console.log(lon);
    });
  };

  const array = [
    { age: 20, name: "Alex", house: "Griffindor" },
    { age: 25, name: "Alexander", house: "Griffindor" },
    { age: 15, name: "Diego", house: "Slytherin" },
    { age: 18, name: "Huy", house: "Hufflepuff" },
    { age: 32, name: "Esmeralda", house: "Ravenclaw" },
  ];
  console.log(array);

  const arrayAges = [
    array[0].age,
    array[1].age,
    array[2].age,
    array[3].age,
    array[4].age,
  ];
  console.log(arrayAges);
  const arrayHouses = [
    array[0].house,
    array[1].house,
    array[2].house,
    array[3].house,
    array[4].house,
  ];
  console.log(arrayHouses);

  console.log((array[0].surname = array[0].name + array[0].house));
  console.log((array[1].surname = array[1].name + array[1].house));
  console.log(array);

  return (
    <div className="w-full h-full relative">
      <img className="w-full h-screen object-cover" src={foto} alt="/" />
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/20"></div>
      <div className="absolute w-full text-white top-10 flex flex-col mx-auto text-3xl">
        <div className=" justify-between text-center ">
          <div className="max-w-[1240px] sm:h-[700px] h-[500px] mx-auto ">
            <p>{status}</p>
            {!data.main ? (
              <button
                onClick={location}
                className="rounded-lg bg-gray-900/90 p-2"
              >
                What is the weather today?
              </button>
            ) : (
              ""
            )}
            <p className="mt-10 text-4xl">{data.name}</p>
            {data.main ? (
              <h1 className="text-8xl p-4">{data.main.temp.toFixed()} ℃</h1>
            ) : (
              ""
            )}
            {data.main ? (
              <p className="absolute rotate-90 mt-10 sm:mt-24 sm:right-5 right-0">
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
