import React, { useContext, useEffect } from "react";
import { RobotContext } from "../Robot";

const SetBlinking = () => {
  const value = useContext(RobotContext);

  useEffect(() => {
    Promise.race([
      fetch("http://192.168.1.252/api/blink?blink=false", {
        method: "POST",
        body: `{ "blink":${value.blinkingBlink} }`,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 10000)
      ),
    ])
      .then((response) => response.json())
      .then((jsonData) => console.log(jsonData));
  }, [value.blinkingBlink]);

  return (
    <div>
      <h2>Blinking</h2>
      <ul>
        <li>
          Blinking:<span style={{ color: "blue" }}> {value.blinkingBlink}</span>
        </li>
      </ul>
    </div>
  );
};
export default SetBlinking;
