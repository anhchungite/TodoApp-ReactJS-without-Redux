import React, {Component} from 'react';
import Todo from './Todo';
import ReactCSSTransitionGroup from'react-addons-css-transition-group';

export default class Todos extends Component {
    render() {
        return (
          <div className="col-sm-offset-2 col-sm-10">
          <table className="table table-responsive table-hover">
            <ReactCSSTransitionGroup transitionName = "example" component="tbody"
               transitionEnterTimeout = {500} transitionLeaveTimeout = {500}>
              {this.props.todosProp.map(todo => <Todo removeTodoProp={this.props.removeTodoProp} selectTodoProp={this.props.selectTodoProp} key={todo.id} {...todo}/>)}
            </ReactCSSTransitionGroup>
          </table>
          </div>
          
        );
    }
}