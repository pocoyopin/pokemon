import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'

import './ListItem.css'

import {store} from '../ContextProvider'

const ListItem = (props) => {
    const globalStore = useContext(store)
    const {state, dispatch} = globalStore

    const [image, setImage] = useState('')
    const [totalOwned, setTotalOwned] = useState(0)

    useEffect(() => {
        const getPokemonData = async () => {
            const pokemonRes = await axios.get(props.url)
            const pokemonResData = pokemonRes.data

            if (pokemonResData.sprites && pokemonResData.sprites.front_default) {
                setImage(pokemonResData.sprites.front_default)
            }
        }

        getPokemonData()
    }, [])

    useEffect(() => {
        const total_owned = state.myPokemon.reduce((counter, {name}) => (
            name === props.name ? counter += 1 : counter
        ), 0)
        setTotalOwned(total_owned)
    }, [state.myPokemon])

    const handleClickPokemon = (name, url) => {
        if (state.page === 'Pokemon List') {
            dispatch({
                type: 'CHANGE_PAGE',
                payload: {
                    page: 'Pokemon Details',
                    pokemon: {
                        name: name,
                        url: url
                    }
                }
            })
        }
    }

    const handleReleasePokemon = () => {
        dispatch({
            type: 'REMOVE_POKEMON',
            payload: {
                name: props.name,
                url: props.url,
                nickname: props.nickname
            }
        })
    }

    return (
        <div className='item' onClick={() => handleClickPokemon(props.name, props.url)}>
            <img src={image} alt={props.name} className='img' />
            <div className='item-name-container'>
                <p className='item-name'>{props.name}</p>
                {state.page === 'My Pokemon List' &&
                <p className='item-nickname'>{props.nickname}</p>
                }
            </div>
            {state.page === 'Pokemon List' &&
            <div className='item-owned-container'>
                <p>Owned: {totalOwned}</p>
            </div>
            }
            {state.page === 'My Pokemon List' &&
            <button onClick={handleReleasePokemon}>Release</button>
            }
        </div>
    )
}

export default ListItem