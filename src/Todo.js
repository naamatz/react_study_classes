import './Todo.scss';
import classNames from "classnames";
import { useState } from 'react'

function Todo({ id, description, completed, onComplete, onRemove }) {
    const [removeVisible, setRemoveVisible] = useState(false)

    const handleCheck = (e) => {
        onComplete(Number(e.target.id))
    }

    const handleClick = (e) => {
        onRemove(Number(e.target.id))
    }

    const handleShow = () => {
        setRemoveVisible(true)
    }
    const handleHide = () => {
        setRemoveVisible(false)
    }

    return (
        <div className='container' onMouseEnter={handleShow} onMouseLeave={handleHide}>
            <div className='todo'>
              <input
                  type='checkbox'
                  id={id}
                  className={classNames({toggle: true, checked: completed})}
                  checked={completed}
                  onChange={handleCheck}
              />
              <label className={classNames({description: true, complete: completed})}>{description}</label>
            </div>
            <button
                id={id}
                className={classNames({remove: true, show: removeVisible || completed})}
                onClick={handleClick}
            >x</button>
        </div>
    );
}

export default Todo;
