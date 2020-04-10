import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

function App_3() {
  return (
    <div>
      <Welcome name="SaraHa" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

function tick() {
  //const name = "Josh Perez";
  const element = (
    <div>
      <Welcome name="Sara" />
      <App_3 />
      <h2> It is {new Date().toLocaleTimeString()}. </h2>
    </div>
  );

  ReactDOM.render(element, document.getElementById("root"));
}

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

setInterval(tick, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
