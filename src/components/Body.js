import React, {useContext, useState} from 'react'

import PokemonList from './PokemonList'
import MyPokemonList from './MyPokemonList'
import PokemonDetails from './PokemonDetails'

import './Body.css'

import {store} from '../ContextProvider'

const Body = () => {
    const globalStore = useContext(store)
    const {state} = globalStore
    const [fetch, setFetch] = useState(false)

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight
        if (bottom) {
            setFetch(true)
        }
    }

    const handleFetchChange = () => {
        setFetch(!fetch)
    }
    
    return (
        <div className="body" onScroll={handleScroll}>
            {state.page === 'Pokemon List' &&
            <PokemonList onFetched={handleFetchChange} fetch={fetch} />
            }

            {state.page === 'My Pokemon List' &&
            <MyPokemonList />
            }

            {state.page === 'Pokemon Details' &&
            <PokemonDetails />
            }
        </div>
    )
}

export default Body