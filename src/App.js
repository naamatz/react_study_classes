import React from 'react';
import './App.scss';
import TodoList from './TodoList'
import Footer from './Footer'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todoList: [], numOfActive: 0, currentFilter: 'all', id: 0 };
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
        this.handleFilterChanged = this.handleFilterChanged.bind(this);
        this.applyFilter = this.applyFilter.bind(this)
    }

    handleAddTodo = (description) => {
        const todo = { id: this.state.id, description: description, completed: false}
        this.setState({
            todoList: [...this.state.todoList, todo],
            numOfActive: this.state.numOfActive + 1,
            id: this.state.id + 1 })
    }

    handleComplete = (id) => {
        const updated = this.state.todoList.map(todo => {
            if(todo.id === id) return {...todo, completed: !todo.completed}
            return todo
        })
        this.setState({
            todoList: updated,
            numOfActive: this.state.numOfActive - 1
        })
    }

    handleRemove = (id) => {
        const updated = this.state.todoList.filter(todo => todo.id !== id)
        const removeActive = this.state.todoList.find(todo => todo.id === id)?.completed === false
       this.setState({
           todoList: updated,
           numOfActive: !!removeActive ? this.state.numOfActive - 1 : this.state.numOfActive }
       )
    }

    handleClearCompleted = () => {
        const updated = this.state.todoList.filter(todo => todo.completed === false)
        this.setState({  todoList: updated })
        }

    handleFilterChanged = (name) =>  this.setState({ currentFilter: name })

    applyFilter = () => {
        switch(this.state.currentFilter) {
            case 'all':
                return this.state.todoList
            case 'complete':
                return this.state.todoList.filter(todo => todo.completed === true)
            case 'active': {
                return this.state.todoList.filter(todo => todo.completed === false)
            }
            default:
                return this.state.todoList
        }
    }

    render() {
        return (
            <div className="app">
                <h1 className='header'>Todos</h1>
                <TodoList
                    todoList={this.applyFilter()}
                    onAddTodo={this.handleAddTodo}
                    onCompleteTodo={this.handleComplete}
                    onRemoveTodo={this.handleRemove}
                />
                <Footer activeTodos={this.state.numOfActive} onClearComplete={this.handleClearCompleted}
                        onFilterChanged={this.handleFilterChanged}/>
            </div>
        )
    }
}

export default App;
