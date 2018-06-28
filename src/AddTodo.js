import React, {Component} from 'react';

export default class AddTodo extends Component {
  render() {
    return (
      <form className="form-horizontal" ref="submitForm">
        <div className="form-group">
        <label className="control-label col-sm-2">ID:</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" ref="todoId"/>
        </div>
        </div>
        <div className="form-group">
        <label className="control-label col-sm-2">Title:</label>
        <div className="col-sm-10">          
          <input type="text" className="form-control" ref="todoTitle"/>
        </div>
        </div>
        <div className="form-group">        
        <div className="col-sm-offset-2 col-sm-10">
          <div className="checkbox">
            <label><input type="checkbox" ref="todoStatus" value="Completed"/> Completed</label>
          </div>
        </div>
        </div>
        <div className="form-group">        
        <div className="col-sm-offset-2 col-sm-10">
          <button className="btn btn-default" onClick={this.handlerAddTodo.bind(this)}>Submit</button>
        </div>
        </div>
      </form>
    );
  }

  handlerAddTodo(e) {
    e.preventDefault();
    this.props.submitTodoProp(this);
  }
  componentDidUpdate(prevProps, prevState) {
      if(this.props.selectedTodo != null) {
      this.refs.todoId.value = this.props.selectedTodo.id;
      this.refs.todoTitle.value = this.props.selectedTodo.title;
      this.props.selectedTodo.status === 'Completed' ? this.refs.todoStatus.checked = true : this.refs.todoStatus.checked = false;
    } 
  }
  componentDidMount() {
    this.refs.todoTitle.focus();
    this.refs.todoId.value = this.props.nextIdProp();
  }
}