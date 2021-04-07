import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'

import {store} from '../ContextProvider'
import './PokemonDetails.css'

const PokemonDetails = () => {
    const globalStore = useContext(store)
    const {state, dispatch} = globalStore

    const [isLoading, setLoading] = useState(true)
    const [pokemon, setPokemon] = useState({})
    const [imgList, setImgList] = useState([])
    const [curImgIndex, setCurImgIndex] = useState(0)

    useEffect(() => {
        const getDataKeys = (obj) => {
            console.log(obj)
            return Object.keys(obj).reduce((result, cur) => (
                typeof obj[cur] === 'string' ? [...result, cur] : result
            ), [])
        }

        const getPokemonData = async () => {
            const pokemonRes = await axios.get(state.pokemon.url)
            const pokemonResData = pokemonRes.data
            setPokemon(pokemonResData)
            setImgList(getDataKeys(pokemonResData.sprites))
            setCurImgIndex(0)
        }

        getPokemonData()
        setLoading(false)
    }, [])

    const handleCatchPokemon = () => {
        const pokemon_caught = Math.floor(Math.random() * 2) === 0 ? false : true
        if (pokemon_caught) {
            let nickname_exist = true

            while (nickname_exist) {

                const nickname = prompt(`Congratulations! You caught a ${state.pokemon.name}. Please give it a nickname:`)

                if (nickname === '') {
                    alert('You have to enter a nickname for your pokemon!')
                    continue
                } else if (nickname) {
                    const pokemons = state.myPokemon.filter(pokemon => {
                        return pokemon.name === state.pokemon.name
                    })
                    
                    nickname_exist = pokemons.some(pokemon => {
                        return pokemon.nickname === nickname
                    })
                    
                    if (nickname_exist) {
                        alert(`You already named another ${state.pokemon.name} you caught with the same nickname! Please choose another nickname for it.`)
                    } else {
                        dispatch({
                            type: 'ADD_POKEMON',
                            payload: {
                                name: state.pokemon.name,
                                url: state.pokemon.url,
                                nickname: nickname
                            }
                        })
                    }
                } else {
                    break
                }

            }
        } else {
            alert(`failed to catch ${state.pokemon.name}`)
        }
    }

    const handleBackButton = () => {
        if (curImgIndex > 0) {
            setCurImgIndex(curImgIndex-1)
        }
    }
    
    const handleNextButton = () => {
        if (curImgIndex < imgList.length-1) {
            setCurImgIndex(curImgIndex+1)
        }
    }

    return (
        <div>
            {isLoading ?
            <p>Loading pokemon details...</p>
            : <>
                <div>
                    <button onClick={handleCatchPokemon} className="catch-button">Catch</button>
                    <div className="images-container">
                        {/* back button */}
                        <div className={`arrow${curImgIndex===0 ? ' disabled' : ''}`}>
                            {state.page === 'Pokemon Details' &&
                            <p className="back-button" onClick={handleBackButton}>&#8249;</p>
                            }
                        </div>

                        {imgList.length &&
                        <img className="pokemon-img" src={pokemon.sprites[imgList[curImgIndex]]} alt={imgList[curImgIndex]} />
                        }

                        {/* next button */}
                        <div className={`arrow${curImgIndex===imgList.length-1 ? ' disabled' : ''}`}>
                            {state.page === 'Pokemon Details' &&
                            <p className="back-button" onClick={handleNextButton}>&#8250;</p>
                            }
                        </div>
                    </div>
                </div>

                <div className="pokemon-list">
                    <p className="list-title">Moves: </p>
                    {pokemon.moves ?
                    <ul>
                        {pokemon.moves.map((item => (
                            <li>{item.move.name}</li>
                        )))}
                    </ul>
                    : <p>N/A</p>
                    }
                </div>

                <div className="pokemon-list">
                    <p className="list-title">Types:</p>
                    {pokemon.types ?
                    <ul>
                        {pokemon.types.map((item => (
                            <li>{item.type.name}</li>
                        )))}
                    </ul>
                    : <p>N/A</p>
                    }
                </div>
            </>
            }
        </div>
    )
}

export default PokemonDetails