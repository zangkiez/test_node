import React from "react";
import fetch from "isomorphic-fetch";
import "./App.css";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { connect, Provider } from "react-redux";
import logger from "redux-logger";

const rootReducer = combineReducers({
  tasks: tasksreducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
//const tasks;

function tasksreducer(state = [], action) {
  //console.log("reducer", action);

  switch (action.type) {
    case "DELETE_LIST":
      return action.tasks;

    default:
      return state;
  }
}

const mapStateToProps = function (state) {
  console.log("state", state);
  return state;
};

const mapDispatchToProps = (dispatch) => {
  console.log("dispatch", dispatch);
  return {};
};

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
  //console.log("TodoList", props);
  const todos = props.tasks.map((todo, index) => {
    //console.log(todo);

    if (todo.var === true) {
      todo.bgColor = "#ffdd57";
    }

    return (
      <Todo
        content={todo.topic}
        key={index}
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
  //console.log(props)
  return (
    <div className="list-item" style={{ backgroundColor: props.bgColor }}>
      <button
        className="delete is-pulled-right is-large"
        onClick={() => {
          props.onDelete(props.id);
          //console.log(props.id);
        }}
      ></button>
      {props.content}
      <button
        className="button is-pulled-left is-warning is-small"
        onClick={() => {
          props.onColor(props.id_color);
          //console.log(props.id_color);
        }}
      >
        <span className="tag is-warning is-small">
          <i className="icofont-bear-face"></i>
        </span>
      </button>
    </div>
  );
};

class App extends React.Component {
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
    await this.setState({ tasks: json });

    await store.dispatch({
      type: "DELETE_LIST",
      tasks: json,
    });
  }

  onChange_color = (item) => {
    item.forEach((item) => {
      console.log(item);
      const newArr = this.state.tasks;

      newArr.splice(item.index, 1, {
        id: item.id,
        createdAt: item.createdAt,
        topic: item.topic,
        var: item.var === true ? false : true,
      });

      const var_true = item.var === true ? false : true;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ var: var_true }),
      };
      fetch(
        `https://5e936fb4c7393c0016de4839.mockapi.io/time/${item.id}`,
        requestOptions
      ).then((response) => response.text());
      //.then((result) => console.log("POST", result));

      store.dispatch({
        type: "DELETE_LIST",
        tasks: [...newArr],
      });
    });
  };

  handleDelete = (index) => {
    //console.log(index);
    index.forEach((index) => {
      const newArr = this.state.tasks;
      newArr.splice(index.index, 1);
      store.dispatch({
        type: "DELETE_LIST",
        tasks: [...newArr],
      });

      const requestOptions = {
        method: "DELETE",
      };

      fetch(
        `https://5e936fb4c7393c0016de4839.mockapi.io/time/${index.id}`,
        requestOptions
      ).then((response) => response.text());
      //.then((result) => console.log(result));
    });
    //console.log(listItems);
  };

  handleSubmit = (e) => {
    //const self = this;
    //this.props.addTodo(e);
    //this.props.onFormSubmit(this.state.term);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: e }),
    };

    fetch(
      "https://5e936fb4c7393c0016de4839.mockapi.io/time",
      requestOptions
    ).then((res) => {
      res.json().then((json) => {
        console.log(json);
        const arr = this.state.tasks;
        arr.push(json);
        console.log(arr);
        store.dispatch({
          type: "DELETE_LIST",
          tasks: [...arr],
        });
      });
    });
  };

  render() {
    return (
      <Provider store={store}>
        <div className="wrapper">
          <div className="card frame">
            <Header numTodos={this.state.tasks.length} />
            <TodoListCN
              tasks={this.state.tasks}
              onDelete={this.handleDelete}
              onColor={this.onChange_color}
              bgColor={this.state.tasks.bgColor}
            />
            <SubmitForm onFormSubmit={this.handleSubmit} />
          </div>
        </div>
      </Provider>
    );
  }
}

const TodoListCN = connect(mapStateToProps, mapDispatchToProps)(TodoList);

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
