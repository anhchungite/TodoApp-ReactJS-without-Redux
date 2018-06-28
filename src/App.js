import React, { Component } from 'react';
import Dialog from 'react-bootstrap-dialog'
import Notifications, {notify} from 'react-notify-toast';
import AddTodo from './AddTodo';
import Todos from './Todos';
import Header from './Header';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos : [],
      selectedTodo: null
    }
  }
  submitTodo(elm) {
    var newState = Object.assign({}, this.state);
    var existTodo = newState.todos.filter(todo => todo.id === elm.refs.todoId.value);
    var todo = {
      id: elm.refs.todoId.value,
      title: elm.refs.todoTitle.value,
      status: elm.refs.todoStatus.checked ? 'Completed' : 'Processing',
    }
    var msg = '';
    if(!existTodo.length > 0) {
      newState.todos.unshift(todo);
      msg = 'Add Todo Success!';
    } else {
      for(let x in newState.todos) {
        if(newState.todos[x].id === elm.refs.todoId.value) {
          newState.todos[x] = todo;
        } 
      }
      msg = 'Update Todo Success!';
    }
    this.setState(newState, () => {
      elm.refs.submitForm.reset();
      elm.refs.todoId.value = this.nextId();
      notify.show(msg, 'success', 1500);
    });
    
  }
  removeTodo(id) {
    var newState = Object.assign({}, this.state);
    this.dialog.show({
      body: 'Are you sure remove this item?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction(
          'Remove',
          () => {
            for(let x in newState.todos) {
              if(newState.todos[x].id === id) {
                newState.todos.splice(x, 1);
              } 
            }
            this.setState(newState, () => {
              notify.show('Removed Todo Success', 'success', 1500);
            });
          },
          'btn-danger'
        )
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide()
      }
    })
  }
  selectTodo(id) {
    var newState = Object.assign({}, this.state);
    var selectedTodo = newState.todos.filter(todo => todo.id === id);
    newState.selectedTodo = selectedTodo[0];
    this.setState(newState)
  }
  nextId() {
    var maxId = 0;
    if(this.state.todos.length > 0) {
      maxId = Math.max.apply(Math, this.state.todos.map((i) => i.id));
    }
    return maxId + 1;
  }
  render() {
    return (
      <div className="App">
        <Dialog ref={(el) => { this.dialog = el }} />
        <Notifications />
        <Header />
        <div className="container">
          <AddTodo nextIdProp={this.nextId.bind(this)} selectedTodo={this.state.selectedTodo} submitTodoProp = {this.submitTodo.bind(this)}/>
          <Todos removeTodoProp={this.removeTodo.bind(this)} selectTodoProp={this.selectTodo.bind(this)} todosProp={this.state.todos}/>
        </div>
      </div>
    );
  }
}

export default App;
