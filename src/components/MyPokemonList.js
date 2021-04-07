import React, {useContext} from 'react'
import ListItem from './ListItem'
import {store} from '../ContextProvider'

const MyPokemonList = () => {
    const globalStore = useContext(store)
    const {state} = globalStore

    return (
        <div>
            {state.myPokemon.map((pokemon, index) => (
                <ListItem
                    key={index}
                    name={pokemon.name}
                    url={pokemon.url}
                    nickname={pokemon.nickname}
                />
            ))}
        </div>
    )
}

export default MyPokemonList