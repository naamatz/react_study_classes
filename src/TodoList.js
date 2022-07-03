import React from 'react'
import './TodoList.scss'
import Todo from './Todo'
import PropTypes from "prop-types";


class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { newTodo: "" }
        this.handleAddTodo = this.handleAddTodo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleComplete = this.handleComplete.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }

     handleAddTodo = (e) => {
         if (e.key === "Enter") {
             this.props.onAddTodo(e.target.value)
             this.setState({newTodo: ""})
         }
     }

     handleChange = (e) => {
            this.setState({ newTodo: e.target.value })
     }

     handleComplete = (id) => {
        this.props.onCompleteTodo(id)
    }

     handleRemove = (id) => {
        this.props.onRemoveTodo(id)
    }

    render() {
        return (
            <div className='todolist'>
                <input
                    type='text'
                    className='new-todo'
                    onKeyUp={this.handleAddTodo}
                    onChange={this.handleChange}
                    placeholder='What needs to be done?'
                    value={this.state.newTodo}
                />
                {this.state.todoList.map(todo => (
                    <Todo
                        key={`todo_${todo.id}`}
                        id={todo.id}
                        completed={todo.completed}
                        description={todo.description}
                        onComplete={this.handleComplete}
                        onRemove={this.handleRemove}
                    />))
                }
            </div>
        )
    }
}

TodoList.Props = {
    todoList: PropTypes.array,
    onAddTodo: PropTypes.func,
    onCompleteTodo: PropTypes.func,
    onRemoveTodo: PropTypes.func
}

export default TodoList;
