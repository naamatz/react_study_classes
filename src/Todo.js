import './Todo.scss';
import classNames from "classnames";
import React from 'react'
import PropTypes from "prop-types";

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { removeVisible: false }
        this.handleCheck = this.handleCheck.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleHide = this.handleHide.bind(this)
    }

    handleCheck = (e) => {
        this.props.onComplete(Number(e.target.id))
    }

    handleClick = (e) => {
        this.props.onRemove(Number(e.target.id))
    }

    handleShow = () => {
        this.setState({ removeVisible: true })
    }
    handleHide = () => {
        this.setState({ removeVisible: false })
    }

    render() {
        const { id, description, completed } = this.props
        return (
            <div className='container' onMouseEnter={this.handleShow} onMouseLeave={this.handleHide}>
                <div className='todo'>
                    <input
                        type='checkbox'
                        id={id}
                        className={classNames({toggle: true, checked: completed})}
                        checked={completed}
                        onChange={this.handleCheck}
                    />
                    <label className={classNames({description: true, complete: completed})}>{description}</label>
                </div>
                <button
                    id={id}
                    className={classNames({remove: true, show: this.state.removeVisible || completed})}
                    onClick={this.handleClick}
                >x
                </button>
            </div>
        )
    }
}

Todo.Props = {
    id: PropTypes.number,
    description: PropTypes.string,
    completed: PropTypes.bool,
    onComplete: PropTypes.func,
    onRemove: PropTypes.func,
}

export default Todo;
