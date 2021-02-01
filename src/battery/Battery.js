import React, { useState, useEffect } from "react";
import Moment from "moment";

const Battery = () => {
  const [battery, setBattery] = useState({});
  const [date, setDate] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      Promise.race([
        fetch("http://192.168.1.252/api/battery", {
          method: "GET",
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 10000)
        ),
      ])
        .then((response) => response.json())
        .then((jsonData) => {
          console.log(jsonData.result);
          setBattery(jsonData.result);
          setDate(Moment(battery.created).format("MM-DD-YYYY"));
        });
    }, 60000);
  }, []);

  return (
    <div>
      <h2>Battery</h2>
      <ul>
        <li>
          Battery Charged Percent:
          <span style={{ color: "blue" }}>
            {" "}
            {battery.chargePercent * 100}%{" "}
          </span>{" "}
        </li>
        <li>
          Date Started:<span style={{ color: "blue" }}> {date}</span>{" "}
        </li>
        <li>
          Battery Current:
          <span style={{ color: "blue" }}>{battery.current}</span>
        </li>
        <li>
          Batter Health Percent:
          <span style={{ color: "blue" }}>
            {" "}
            {battery.healthPercent * 100}%{" "}
          </span>{" "}
        </li>
        <li>
          Battery Charging:{" "}
          <span style={{ color: "blue" }}>
            {battery.isCharging ? battery.isCharging.toString() : "false"}{" "}
          </span>{" "}
        </li>
        <li>
          Battery Sensor ID:
          <span style={{ color: "blue" }}> {battery.sensorId} </span>{" "}
        </li>
        <li>
          Battery State:<span style={{ color: "blue" }}> {battery.state} </span>{" "}
        </li>
        <li>
          Battery Temperature:{" "}
          <span style={{ color: "blue" }}>{battery.temperature} </span>{" "}
        </li>
        <li>
          Battery Trained:{" "}
          <span style={{ color: "blue" }}>
            {battery.trained ? battery.trained.toString() : ""}{" "}
          </span>{" "}
        </li>
        <li>
          Battery Voltage:
          <span style={{ color: "blue" }}> {battery.voltage} </span>{" "}
        </li>
      </ul>
    </div>
  );
};
export default Battery;
