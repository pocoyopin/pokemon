import React, {useContext} from 'react'
import './Header.css'

import {store} from '../ContextProvider'

const Header = () => {
    const globalStore = useContext(store)
    const {state, dispatch} = globalStore

    const handleBackButton = () => {
        dispatch({
            type: 'CHANGE_PAGE',
            payload: {
                page: 'Pokemon List',
                pokemon: {
                    name: '',
                    url: ''
                }
            }
        })
    }

    return (
        <div className="header">
            {/* back button */}
            <div className="header-back">
            {state.page === 'Pokemon Details' &&
            <p className="back-button" onClick={handleBackButton}>&#8249;</p>
            }
            </div>

            <div className="header-title">
                <h1 className="title">
                    {state.page === 'Pokemon Details' ?
                    state.pokemon.name
                    : state.page}
                </h1>
            </div>
        </div>
    )
}

export default Header