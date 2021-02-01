import React, { useContext, useEffect } from "react";
import { RobotContext } from "../Robot";

const ChangeLed = () => {
  const value = useContext(RobotContext);

  useEffect(() => {
    Promise.race([
      fetch("http://192.168.1.252/api/led?red=0&green=0&blue=0", {
        method: "POST",
        body: `{ "red":${value.ledRed},"green":${value.ledGreen},"blue":${value.ledBlue} }`,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 10000)
      ),
    ])
      .then((response) => response.json())
      .then((jsonData) => console.log(jsonData));
  }, [value.ledBlue, value.ledGreen, value.ledRed]);

  return (
    <div>
      <h2>Change Led</h2>
      <ul>
        <li>
          Led Red:
          <span style={{ color: "blue" }}>
            {" "}
            {value.ledRed ? value.ledRed : 0}
          </span>{" "}
        </li>
        <li>
          Led Blue:
          <span style={{ color: "blue" }}>
            {" "}
            {value.ledBlue ? value.ledBlue : 0}
          </span>{" "}
        </li>
        <li>
          Led Green:
          <span style={{ color: "blue" }}>
            {value.ledGreen ? value.ledGreen : 0}
          </span>{" "}
        </li>
      </ul>
    </div>
  );
};
export default ChangeLed;
