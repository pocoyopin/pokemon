import React, {useState, useEffect, useRef, useCallback} from 'react'
import axios from 'axios'
import ListItem from './ListItem'

const PokemonList = (props) => {
    const [allPokemon, setAllPokemon] = useState([])
    const [nextPokemon, setNextPokemon] = useState('')

    const bottomBoundaryRef = useRef(null)

    useEffect(() => {
        const getPokemonList = async () => {
            const pokemonRes = await axios.get('https://pokeapi.co/api/v2/pokemon')
            const pokemonResData = pokemonRes.data

            setNextPokemon(pokemonResData.next)
            setAllPokemon(prevState => [...prevState, ...pokemonResData.results])
        }

        getPokemonList()
    }, [])

    useEffect(() => {
        const getNextPokemonList = async () => {
            const pokemonRes = await axios.get(nextPokemon)
            const pokemonResData = pokemonRes.data

            setNextPokemon(pokemonResData.next)
            setAllPokemon(prevState => [...prevState, ...pokemonResData.results])
            props.onFetched()
        }

        if (fetch && nextPokemon) {
            getNextPokemonList()
        }
    }, [props.fetch])    

    return (
        <div>
            {allPokemon.map(pokemon => (
            <ListItem
                key={pokemon.url}
                name={pokemon.name}
                url={pokemon.url}
            />
            ))}
        </div>
    )
}

export default PokemonList