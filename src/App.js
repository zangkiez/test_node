import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import "./App.css";

const Header = (props) => {
  //console.log(props.numTodos);
  return (
    <div className="card-header">
      <h1 className="card-header-title header">
        คุณมีงาน {props.numTodos} งาน
      </h1>
    </div>
  );
};

const TodoList = (props) => {
  //const bgColor = props.bgColor;
  const todos = props.tasks.map((todo, index) => {
    //console.log(todo);

    if (todo.var === true) {
      todo.bgColor = "#EAE74E";
    }

    return (
      <Todo
        content={todo.topic}
        id_color={[
          {
            id: todo.id,
            index: index,
            createdAt: todo.createdAt,
            topic: todo.topic,
            var: todo.var,
          },
        ]}
        id={[{ id: todo.id, index: index }]}
        onDelete={props.onDelete}
        onColor={props.onColor}
        bgColor={todo.bgColor}
      />
    );
  });
  return <div className="list-wrapper">{todos}</div>;
};

const Todo = (props) => {
  return (
    <div
      className="list-item"
      style={{ backgroundColor: props.bgColor }}
      onClick={(e) => {
        props.onColor(props.id_color);
        console.log(e.body);
        //console.log(props.id_color);
      }}
    >
      {props.content}

      <button
        class="delete is-pulled-right"
        onClick={() => {
          props.onDelete(props.id);
          //console.log(props.id);
        }}
      ></button>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      bgColor: "",
    };
  }

  async componentDidMount() {
    const response = await fetch(
      "https://5e936fb4c7393c0016de4839.mockapi.io/time"
    );
    const json = await response.json();
    this.setState({ tasks: json });

    //console.log(this.state.tasks);
    this.state.tasks.map((index) => {
      if (index.var !== true) {
        this.setState({ bgColor: "#FFFFFF" });
      }
      return null;
    });
  }

  onChange = (index) => {
    index.map((index) => {
      //console.log(index);
      const newArr = [...this.state.tasks];
      //console.log(newArr);
      newArr.splice(index.index, 1, {
        id: index.id,
        createdAt: index.createdAt,
        topic: index.topic,
        var: index.var === true ? false : true,
      });
      console.log(newArr);
      this.setState({ tasks: newArr });

      //then(() => {
      console.log("Updating the entry succeeded");
      // if (index.id) {
      //   index.var === true
      //     ? this.setState({ bgColor: "#EAE74E" })
      //     : this.setState({ bgColor: "#FFFFFF" });
      // }
      // console.log(this.state.bgColor);
      console.log(index.var);
      //});

      return null;
    });
  };

  handleDelete = (index) => {
    index.map((index) => {
      //console.log(index);

      const newArr = [...this.state.tasks];
      console.log(newArr);
      newArr.splice(index.index, 1);
      console.log(newArr);
      this.setState({ tasks: newArr });

      const requestOptions = {
        method: "DELETE",
      };

      fetch(
        `https://5e936fb4c7393c0016de4839.mockapi.io/time/${index.id}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result));

      return null;
    });
    //console.log(listItems);
  };

  handleSubmit = (task) => {
    //const self = this;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: task }),
    };

    fetch("https://5e936fb4c7393c0016de4839.mockapi.io/time", requestOptions)
      //.then((response) => response.json())
      .then((response) => {
        response.json().then((data) => {
          this.setState({ tasks: [...this.state.tasks, data] });
        });
      });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="card frame">
          <Header numTodos={this.state.tasks.length} />
          <TodoList
            tasks={this.state.tasks}
            onDelete={this.handleDelete}
            onColor={this.onChange}
            bgColor={this.state.bgColor}
          />
          <SubmitForm onFormSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

class SubmitForm extends React.Component {
  state = { term: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.term === "") return;
    this.props.onFormSubmit(this.state.term);
    this.setState({ term: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter Item"
          value={this.state.term}
          onChange={(e) => this.setState({ term: e.target.value })}
        />
        <button className="button">Submit</button>
      </form>
    );
  }
}

export default App;
