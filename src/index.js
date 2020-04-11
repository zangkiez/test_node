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

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function formatDate(date) {
  return date.toLocaleDateString();
}

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: "I hope you enjoy learning React!",
  author: {
    name: "Hello Kitty",
    avatarUrl: "https://placekitten.com/g/64/64",
  },
};

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world! 2</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const element = (
  <div>
    <div>
      <Welcome name="Sara" />
      <App_3 />
      <Clock date={new Date()} />
      <h2> It is {new Date().toLocaleTimeString()}. </h2>
    </div>
    <div>
      <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author}
      />
    </div>
  </div>
);

function tick() {
  ReactDOM.render(element, document.getElementById("root"));
}

setInterval(tick, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
