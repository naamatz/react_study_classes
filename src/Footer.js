import './Footer.scss';
import classNames from "classnames";
import { useState } from 'react'

function Footer({ activeTodos, onFilterChanged, onClearComplete}) {
    const [activeFilter, setActiveFilter] = useState('all')
    const isActiveFilter = (name) => activeFilter ===  name
    const handleChooseFilter = (e) => {
        setActiveFilter(e.target.name)
        onFilterChanged(e.target.name)
    }

    return (
        <footer className='footer'>
            <label className='active-num'>{`${activeTodos} ${activeTodos === 1 ? 'item' : 'items'} left`}</label>
            <div className='filters'>
                {[
                    { name: 'all', label: 'All' },
                    { name: 'active', label: 'Active' },
                    { name: 'complete', label: 'Completed' }
                ].map(item =>
                    <button
                        name={item.name}
                        className={classNames({filter: true, disabled: !isActiveFilter(item.name)})}
                        onClick={handleChooseFilter}
                    >{item.label}
                    </button>
                )}
            </div>
            <button className='clear' onClick={onClearComplete}>Clear completed</button>
        </footer>
    );
}

export default Footer;