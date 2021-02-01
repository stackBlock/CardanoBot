import React, { useEffect, useContext } from "react";
import { RobotContext } from "../Robot";

const DriveTime = () => {
  const value = useContext(RobotContext);
  console.log(value.driveRight);

  const linVel =
    value.driveForward === ("true" || "True")
      ? 100
      : value.driveBackward === ("true" || "True")
      ? -100
      : 0;
  const angVel =
    value.driveRight === ("true" || "True")
      ? -100
      : value.driveLeft === ("true" || "True")
      ? 100
      : 0;
  const dur = parseInt(value.driveDuration);

  console.log(`timeMs: ${dur}`);
  console.log(`linearVelocity: ${linVel}`);
  console.log(`angularVelocity: ${angVel}`);
  console.log(`driveDuration: ${parseInt(value.driveDuration)}`);
  console.log(`driveRight: ${value.driveRight}`);
  console.log(`driveLeft: ${value.driveLeft}`);
  console.log(`driveForward: ${value.driveForward}`);
  console.log(`driveBackward: ${value.driveBackward}`);

  useEffect(() => {
    Promise.race([
      fetch(
        "http://192.168.1.252/api/drive/time?linearVelocity=0&angularVelocity=0&timeMs=100°ree=0",
        {
          method: "POST",
          body: `{ "linearVelocity": ${linVel},"angularVelocity": ${angVel},"timeMs": ${dur},"degree": null }`,
        }
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 10000)
      ),
    ])
      .then((response) => response.json())
      .then((jsonData) => console.log(jsonData));
  }, [angVel, dur, linVel]);

  return (
    <div>
      <h2>Drive</h2>
      <ul>
        <li>
          Drive Duration:{" "}
          <span style={{ color: "blue" }}>
            {" "}
            {value.driveDuration ? value.driveDuration : 0}
          </span>{" "}
        </li>
        <li>
          Drive Right:{" "}
          <span style={{ color: "blue" }}> {value.driveRight}</span>{" "}
        </li>
        <li>
          Drive Left: <span style={{ color: "blue" }}> {value.driveLeft}</span>{" "}
        </li>
        <li>
          Drive Forward:{" "}
          <span style={{ color: "blue" }}> {value.driveForward}</span>{" "}
        </li>
        <li>
          rive Backward:{" "}
          <span style={{ color: "blue" }}> {value.driveBackward}</span>{" "}
        </li>
      </ul>
    </div>
  );
};
export default DriveTime;
