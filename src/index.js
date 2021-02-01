import React from "react";
import { render } from "react-dom";
import { createClient, Provider } from "urql";
import Robot from "./Robot";

const client = createClient({
  url: "http://3.215.77.250:3100/",
});

const App = () => (
  <Provider value={client}>
    <Robot />
  </Provider>
);

render(<App />, document.getElementById("root"));
