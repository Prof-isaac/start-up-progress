import React from "react";
import ReactDOM from "react-dom";
import StartUpProgress from "./start-up-progress";
import "./style.scss";

const App = () => {
  return <StartUpProgress />;
};

ReactDOM.render(<App />, document.getElementById("root"));
