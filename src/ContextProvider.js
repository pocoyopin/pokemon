import React, {createContext, useReducer, useEffect} from 'react'

const initialValue = {
    page: 'Pokemon List',
    pokemon: {
        name: '',
        url: ''
    },
    myPokemon: []
}
const initialState = (initial = initialValue) => JSON.parse(localStorage.getItem("pokemonState")) || initial

const store = createContext(initialState)
const { Provider } = store

const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'CHANGE_PAGE':
                const newState = {
                    ...state,
                    ...action.payload
                }
                return newState
            case 'ADD_POKEMON':
                return {
                    ...state,
                    myPokemon: [...state.myPokemon, action.payload]
                }
            case 'REMOVE_POKEMON':
                const new_pokemons = state.myPokemon.filter(pokemon => {
                    const removed_pokemon = action.payload
                    return ((pokemon.nickname !== removed_pokemon.nickname) || (pokemon.name !== removed_pokemon.name))
                })
                return {
                    ...state,
                    myPokemon: new_pokemons
                }
            default:
                throw new Error('no action')
        }
    }, initialValue, initialState)

    useEffect(() => {
        localStorage.setItem("pokemonState", JSON.stringify(state))
    }, [state])

    return (
        <Provider value={{state, dispatch}}>
            {children}
        </Provider>
    )
}

export {store, ContextProvider}