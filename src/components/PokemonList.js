import React, {useState, useEffect, useRef, useCallback} from 'react'
import axios from 'axios'
import ListItem from './ListItem'

const PokemonList = (props) => {
    const [allPokemon, setAllPokemon] = useState([])
    const [nextPokemon, setNextPokemon] = useState('')
    // const [fetch, setFetch] = useState(false)

    const bottomBoundaryRef = useRef(null)

    // useEffect(() => {
    //     const options = {
    //         root: document.querySelector('#page-bottom-boundary'),
    //         rootMargin: "0px",
    //         threshold: 1.0
    //     }
    //     const observer = new IntersectionObserver(handleObserver, options);
    //     if (bottomBoundaryRef.current) {
    //         observer.observe(bottomBoundaryRef.current)
    //     }
    // }, [])

    // const handleObserver = (entities) => {
    //     const target = entities[0];
    //     if (target.isIntersecting) {   
    //         setFetch(true)
    //     }
    // }

    // const scrollObserver = useCallback(node => {
    //     new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             if (entry.intersectionRatio > 0.5) {
    //                 setFetch(true)
    //             }
    //         })
    //     }).observe(node)
    // }, [setFetch])

    // useEffect(() => {
    //     if (bottomBoundaryRef.current) {
    //         scrollObserver(bottomBoundaryRef.current)
    //     }
    // }, [scrollObserver, bottomBoundaryRef])

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
            // setFetch(false)
            props.onFetched()
        }

        if (fetch && (nextPokemon !== '')) {
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

            
            <div id='page-bottom-boundary' ref={bottomBoundaryRef}>
                <p>Load More</p>
            </div>
        </div>
    )
}

export default PokemonList