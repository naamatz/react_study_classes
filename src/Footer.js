import './Footer.scss'
import classNames from "classnames"
import React from 'react'
import PropTypes from "prop-types"

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeFilter: 'all' }
        this.handleChooseFilter = this.handleChooseFilter.bind(this)
        this.isActiveFilter = this.isActiveFilter.bind(this)
    }


    isActiveFilter = (name) => this.state.activeFilter ===  name

    handleChooseFilter = (e) => {
        this.setState({ activeFilter: e.target.name })
        this.props.onFilterChanged(e.target.name)
    }

    render() {
        return (
            <footer className='footer'>
                <label className='active-num'>{`${this.state.activeTodos} ${this.state.activeTodos === 1 ? 'item' : 'items'} left`}</label>
                <div className='filters'>
                    {[
                        { name: 'all', label: 'All' },
                        { name: 'active', label: 'Active' },
                        { name: 'complete', label: 'Completed' }
                    ].map(item =>
                        <button
                            key={item.name}
                            name={item.name}
                            className={classNames({filter: true, disabled: !this.isActiveFilter(item.name)})}
                            onClick={this.handleChooseFilter}
                        >{item.label}
                        </button>
                    )}
                </div>
                <button className='clear' onClick={this.props.onClearComplete}>Clear completed</button>
            </footer>
        )
    }

}

Footer.Props = {
    activeTodos: PropTypes.number,
    onFilterChanged: PropTypes.func,
    onClearComplete: PropTypes.func
}

export default Footer;