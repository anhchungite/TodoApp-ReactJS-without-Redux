import React, {Component} from 'react';

export default class Todo extends Component {
    render() {
        return (
            <tr onClick={this.handlerSelectTodo.bind(this, this.props.id)}>
                <td>{this.props.id}</td>
                <td>{this.props.title}</td>
                <td>{this.props.status}</td>
                <td>
                    <button className="btn btn-sm btn-danger" onClick={this.handlerRemoveTodo.bind(this, this.props.id)}>Remove</button>
                </td>
            </tr>
        );
    }
    handlerSelectTodo (id) {
        this.props.selectTodoProp(id);
    }

    handlerRemoveTodo (id) {
        this.props.removeTodoProp(id);
    }
}