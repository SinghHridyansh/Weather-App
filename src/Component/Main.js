import "./Main.css";
import React, { useRef, useState } from "react";

export default function Main() {
  const [fetchcity, setFetchCity] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState([
    "London",
    "New York",
    "Los Angeles",
    "Las Vegas",
  ]);
  var reference = useRef();
  const [query, setQuery] = useState("New York");
  const fetchDataHandle = () => {
    if (city.length > 0) {
      const item = city[0];
      fetch(
        `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${item}`
      )
        .then((data) => data.json())
        .then((response) => {
          setFetchCity([...fetchcity, { name: item, ...response }]);
          const newcity = city.filter((item, index) => index !== 0);
          setCity(newcity);
        });
    }
  };

  function removeActivity(name) {
    const newDetails = fetchcity.filter((item) => item.name !== name);
    setFetchCity(newDetails);
    setCity([...city, name]);
  }

  const submitHandler = (e) => {
    console.log(e.target.value);

    e.preventDefault();
    setQuery(search);

    setSearch("");
  };

  const handleSearch = (e) => {
    setSearch(reference.current.value);
    reference.current.value = "";

    setTimeout(() => {
      setSearch("");
    }, 3000);
  };

  return (
    <div>
      <div className="container">
        <div>
          <button className="get-weather" onClick={fetchDataHandle}>
            Get Weather
          </button>
          <div>
            <table>
              <thead>
                <tr>
                  <th className="cityname">City</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id="city" className={fetchcity.length < 1 ? "t0" : "t"}>
                    London
                  </td>
                </tr>
                <tr>
                  <td id="city1" className={fetchcity.length < 2 ? "t0" : "t"}>
                    New York
                  </td>
                </tr>
                <tr>
                  <td id="city2" className={fetchcity.length < 3 ? "t0" : "t"}>
                    Los Angeles
                  </td>
                </tr>
                <tr>
                  <td id="city3" className={fetchcity.length < 4 ? "t0" : "t"}>
                    Las Vegas
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="city-search">
          <div className="city-search-2">
            <input type="text" placeholder="City Name" ref={reference} />
            <button
              onClick={handleSearch}
              type="submit"
              className="search-button"
            >
              Search
            </button>
          </div>
          <div>
            <table className="info-table">
              <thead>
                <tr style={{ backgroundColor: "#4472C4", color: "white" }}>
                  <th scope="col">City</th>
                  <th scope="col">Discription</th>
                  <th scope="col">Temperature</th>
                  <th scope="col">Pressure</th>
                  <th scope="col">Data age </th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {fetchcity.length === 0 ? (
                  <tr>
                    <th colSpan="6">
                      <h1>No Data Found</h1>
                    </th>
                  </tr>
                ) : (
                  fetchcity.map((item) => {
                    return (
                      <tr
                        key={item.name}
                        style={{
                          backgroundColor:
                            search === item.name ? "yellow" : "white",
                        }}
                      >
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.temp_in_celsius}°C</td>
                        <td>{item.pressure_in_hPa}</td>
                        <td>
                          {new Date().getHours() -
                            new Date(item.date_and_time).getHours()}{" "}
                          hrs
                        </td>
                        <td
                          onClick={() => removeActivity(item.name)}
                          style={{
                            cursor: "pointer",
                            color: "#4472c4",
                            textDecoration: "underline",
                          }}
                        >
                          Delete
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
