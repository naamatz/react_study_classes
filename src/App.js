import './App.scss';
import TodoList from './TodoList'
import Footer from './Footer'
import {useState, useCallback} from 'react';

function App() {
    const [todoList, setTodoList] = useState([])
    const [numOfActive, setNumOfActive] = useState(0)
    const [currentFilter, setCurrentFilter] = useState('all')
    const [id, setId] = useState(0)

    const handleAddTodo = (description) => {
        const todo = { id: id, description: description, completed: false}
        setTodoList([...todoList, todo])
        setNumOfActive(numOfActive+1)
        setId(id+1)
    }

    const handleComplete = (id) => {
        const updated = todoList.map(todo => {
            if(todo.id === id) return {...todo, completed: !todo.completed}
            return todo
        })
        setTodoList(updated)
        setNumOfActive(numOfActive-1)
    }

    const handleRemove = (id) => {
        const updated = todoList.filter(todo => todo.id !== id)
        const removeActive = todoList.find(todo => todo.id === id)?.completed === false
        setTodoList(updated)
        if (!!removeActive) setNumOfActive(numOfActive - 1)
    }

    const handleClearCompleted = () => {
        const updated = todoList.filter(todo => todo.completed === false)
        setTodoList(updated)
    }

    const handleFilterChanged = (name) => setCurrentFilter(name)

    const applyFilter = useCallback(() => {
        switch(currentFilter) {
            case 'all':
                return todoList
            case 'complete':
                return todoList.filter(todo => todo.completed === true)
            case 'active': {
                return todoList.filter(todo => todo.completed === false)
            }
            default:
                return todoList
        }
    },[todoList, currentFilter])

    return (
        <div className="app">
            <h1 className='header'>Todos</h1>
            <TodoList
                todoList={applyFilter()}
                onAddTodo={handleAddTodo}
                onCompleteTodo={handleComplete}
                onRemoveTodo={handleRemove}
            />
            <Footer activeTodos={numOfActive} onClearComplete={handleClearCompleted} onFilterChanged={handleFilterChanged}/>
        </div>
    );
}

export default App;
