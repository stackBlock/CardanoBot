import React, { useContext, useEffect } from "react";
import { RobotContext } from "../Robot";

const MoveHead = () => {
  const value = useContext(RobotContext);

  useEffect(() => {
    Promise.race([
      fetch("http://192.168.1.252/api/head?pitch=0&roll=0&yaw=0", {
        method: "POST",
        body: `{ "pitch":${value.headPitch},"roll":${value.headRoll},"yaw":${value.headYaw},"velocity":null,"duration":null,"units":null }`,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 10000)
      ),
    ])
      .then((response) => response.json())
      .then((jsonData) => console.log(jsonData));
  }, [value.headPitch, value.headRoll, value.headYaw]);

  console.log(value.headPitch);

  return (
    <div>
      <h2>Move Head</h2>
      <ul>
        <li>
          Head Pitch Position:{" "}
          <span style={{ color: "blue" }}>
            {" "}
            {value.headPitch ? value.headPitch : 0}
          </span>
        </li>
        <li>
          Head Roll Position:
          <span style={{ color: "blue" }}>
            {" "}
            {value.headRoll ? value.headRoll : 0}
          </span>
        </li>
        <li>
          Head Yaw Velocity:
          <span style={{ color: "blue" }}>
            {" "}
            {value.headYaw ? value.headYaw : 0}
          </span>
        </li>
      </ul>
    </div>
  );
};
export default MoveHead;
