import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import Main from "./Main";

injectTapEventPlugin();

const app = document.getElementById("app");

ReactDOM.render(<Main/>, app);