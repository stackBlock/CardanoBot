import React, { useEffect, useReducer, createContext } from "react";
import { useQuery } from "urql";
import ROBOT_DATA from "./schemas/robotSchema";
import MoveArms from "./movement/MoveArms";
import DriveTime from "./movement/DriveTime";
import MoveHead from "./movement/MoveHead";
import ChangeLed from "./expression/ChangeLed";
import SetBlinking from "./expression/SetBlinking";
import SetFlashLight from "./expression/SetFlashlight";
import Battery from "./battery/Battery";

const RobotQuery = ROBOT_DATA;

function registerReducer(state, action) {
  if (action.type === "drive") {
    return {
      // MOVEMENT DRIVE
      ...state,
      [action.driveRight]: action.rightValue,
      [action.driveLeft]: action.leftValue,
      [action.driveForward]: action.forwardValue,
      [action.driveBackward]: action.backwardValue,
      [action.driveDuration]: action.durationValue,
    };
  } else if (action.type === "arms") {
    return {
      // MOVEMENT ARMS
      ...state,
      [action.armsLeftArmPosition]: action.leftArmPositionValue,
      [action.armsRightArmPosition]: action.rightArmPositionValue,
    };
  } else if (action.type === "head") {
    return {
      // MOVEMENT DRIVE
      ...state,
      [action.headYaw]: action.yawValue,
      [action.headRoll]: action.rollValue,
      [action.headPitch]: action.pitchValue,
    };
  } else if (action.type === "led") {
    return {
      // EXPRESSION DRIVE
      ...state,
      [action.ledRed]: action.redValue,
      [action.ledBlue]: action.blueValue,
      [action.ledGreen]: action.greenValue,
    };
  } else if (action.type === "blinking") {
    return {
      // EXPRESSION DRIVE
      ...state,
      [action.blinkingBlink]: action.blinkValue,
    };
  } else if (action.type === "flashlight") {
    return {
      // EXPRESSION DRIVE
      ...state,
      [action.flashlightFlash]: action.flashValue,
    };
  } else {
    throw new Error(`This action is not supported`);
  }
}

const initialState = {
  driveDuration: "100",
  driveRight: "false",
  driveLeft: "false",
  driveForward: "false",
  driveBackward: "false",
  armsLeftArmPosition: "30",
  armsRightArmPosition: "90",
  headYaw: "10",
  headRoll: "20",
  headPitch: "30",
  ledRed: "0",
  ledBlue: "0",
  ledGreen: "0",
  blinkingBlink: "false",
  flashlightFlash: "false",
};

export const RobotContext = createContext();

const Robot = () => {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  const [result, reexecuteQuery] = useQuery({
    query: RobotQuery,
  });

  const { data, fetching, error } = result;

  const refresh = () => {
    // Refetch the query and skip the cache
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  useEffect(() => {
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    const lastCommand = data.transactions.slice(-1).pop();
    console.log(lastCommand);

    dispatch({
      // MOVEMENT DRIVE
      type: "drive",
      driveRight: "driveRight",
      rightValue: lastCommand.metadata[0].value.movement.drive.turnToTheRight,
      driveLeft: "driveLeft",
      leftValue: lastCommand.metadata[0].value.movement.drive.turnToTheLeft,
      driveForward: "driveForward",
      forwardValue: lastCommand.metadata[0].value.movement.drive.goForward,
      driveBackward: "driveBackward",
      backwardValue: lastCommand.metadata[0].value.movement.drive.goBackward,
      driveDuration: "driveDuration",
      durationValue: lastCommand.metadata[0].value.movement.drive.duration,
    });
    dispatch({
      type: "arms",
      armsLeftArmPosition: "armsLeftArmPosition",
      leftArmPositionValue:
        lastCommand.metadata[0].value.movement.moveArms.leftArmPosition,
      armsRightArmPosition: "armsRightArmPosition",
      rightArmPositionValue:
        lastCommand.metadata[0].value.movement.moveArms.rightArmPosition,
    });
    dispatch({
      type: "head",
      headYaw: "headYaw",
      yawValue: lastCommand.metadata[0].value.movement.moveHead.yaw,
      headRoll: "headRoll",
      rollValue: lastCommand.metadata[0].value.movement.moveHead.roll,
      headPitch: "headPitch",
      pitchValue: lastCommand.metadata[0].value.movement.moveHead.pitch,
    });
    dispatch({
      type: "led",
      ledRed: "ledRed",
      redValue: lastCommand.metadata[0].value.expression.changeLed.red,
      ledBlue: "ledBlue",
      blueValue: lastCommand.metadata[0].value.expression.changeLed.blue,
      ledGreen: "ledGreen",
      greenValue: lastCommand.metadata[0].value.expression.changeLed.green,
    });
    dispatch({
      type: "blinking",
      blinkingBlink: "blinkingBlink",
      blinkValue: lastCommand.metadata[0].value.expression.setBlinking,
    });
    dispatch({
      type: "flashlight",
      flashlightFlash: "flashlightFlash",
      flashValue: lastCommand.metadata[0].value.expression.setFlashLight,
    });

    const interval = setInterval(() => {
      refresh();
    }, 10000);

    return () => clearInterval(interval);
  }, [data, error, fetching]);

  return (
    <div>
      <Battery />
      <h1>Movements</h1>
      <RobotContext.Provider value={state}>
        <DriveTime />
        <MoveArms />
        <MoveHead />
        <h1>Expressions</h1>
        <ChangeLed />
        <SetBlinking />
        <SetFlashLight />
      </RobotContext.Provider>
    </div>
  );
};

export default Robot;
