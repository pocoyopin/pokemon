import React, {useContext} from 'react'
import './Navigation.css'

import {store} from '../ContextProvider'

const Navigation = (props) => {
    const globalStore = useContext(store)
    const {state, dispatch} = globalStore

    const handleNavClick = (page) => {
        dispatch({
            type: 'CHANGE_PAGE',
            payload: {
                page: page,
                pokemon: {
                    name: '',
                    url: ''
                }
            }
        })
    }
    
    return (
        <div className="bottom-nav">
            <div
                className={`nav-item${state.page === 'Pokemon List' ? ' active-nav' : ''}`}
                onClick={() => handleNavClick('Pokemon List')}
            >
                All List
            </div>
            <div
                className={`nav-item${state.page === 'My Pokemon List' ? ' active-nav' : ''}`}
                onClick={() => handleNavClick('My Pokemon List')}
            >
                My List
            </div>
        </div>
    )
}

export default Navigation