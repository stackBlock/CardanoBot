import React, { useContext, useEffect } from "react";
import { RobotContext } from "../Robot";

const MoveArms = () => {
  const value = useContext(RobotContext);

  useEffect(() => {
    Promise.race([
      fetch(
        "http://192.168.1.252/api/arms/set?leftArmPosition=90&rightArmPosition=32&duration=0",
        {
          method: "POST",
          body: `{ "leftArmPosition":${value.armsLeftArmPosition},"rightArmPosition":${value.armsRightArmPosition},"leftArmVelocity": null,"rightArmVelocity": null,"duration": null,"units": null }`,
        }
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 10000)
      ),
    ])
      .then((response) => response.json())
      .then((jsonData) => console.log(jsonData));
  }, [value.armsLeftArmPosition, value.armsRightArmPosition]);

  return (
    <div>
      <h2>Move Arms</h2>
      <ul>
        <li>
          Left Arm Position:{" "}
          <span style={{ color: "blue" }}>
            {value.armsLeftArmPosition ? value.armsLeftArmPosition : 0}{" "}
          </span>
        </li>
        <li>
          Right Arm Position:
          <span style={{ color: "blue" }}>
            {value.armsRightArmPosition ? value.armsRightArmPosition : 0}{" "}
          </span>
        </li>
      </ul>
    </div>
  );
};
export default MoveArms;
