import './TodoList.scss';
import { useState } from 'react'
import Todo from './Todo'


function TodoList({ todoList, onAddTodo, onCompleteTodo, onRemoveTodo }) {
    const [newTodo, setNewTodo] = useState("")

    const handleAddTodo = (e) => {
        if (e.key === "Enter") {
            onAddTodo(e.target.value)
            setNewTodo("")
        }
    }

    const handleChange = (e) => {
        setNewTodo(e.target.value)
    }

    const handleComplete = (id) => {
        onCompleteTodo(id)
    }

    const handleRemove = (id) => {
        onRemoveTodo(id)
    }

    return (
        <div className='todolist'>
            <input
                type='text'
                className='new-todo'
                onKeyUp={handleAddTodo}
                onChange={handleChange}
                placeholder='What needs to be done?'
                value={newTodo}
            />
            {todoList.map(todo => (
                <Todo
                    key={`todo_${todo.id}`}
                    id={todo.id}
                    completed={todo.completed}
                    description={todo.description}
                    onComplete={handleComplete}
                    onRemove={handleRemove}
                />))
            }
        </div>
    );
}

export default TodoList;
