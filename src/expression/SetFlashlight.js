import React, { useContext, useEffect } from "react";
import { RobotContext } from "../Robot";

const SetFlashLight = () => {
  const value = useContext(RobotContext);
  useEffect(() => {
    Promise.race([
      fetch("http://192.168.1.252/api/flashlight?on=false", {
        method: "POST",
        body: `{ "on":${value.flashlightFlash} }`,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 10000)
      ),
    ])
      .then((response) => response.json())
      .then((jsonData) => console.log(jsonData));
  }, [value.flashlightFlash]);

  return (
    <div>
      <h2>Flashlight</h2>
      <ul>
        <li>
          Flashlight:
          <span style={{ color: "blue" }}> {value.flashlightFlash}</span>{" "}
        </li>
      </ul>
    </div>
  );
};
export default SetFlashLight;
