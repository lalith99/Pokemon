import React, {useState, useEffect } from 'react';
import logo from './logo.svg';
import {getAllPokemon,getPokemon } from './services/pokemon'
import './App.css';
import Card from './Card/Card'

function App() {

  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl , setNextUrl] = useState('');
  const [prevUrl , setPrevUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(()=> {
    async function fetchData(){
      let response = await getAllPokemon(initialUrl)
     
      setNextUrl(response.next)
      setPrevUrl(response.previous)
      let pokemon = await loadingPokemon(response.results)
      console.log(pokemon)
      setLoading(false)

    }
    fetchData()
  }, [])



  const loadingPokemon =async (data ) =>{
let _pokemonData = await Promise.all(data.map(async pokemon =>{
  let pokemonRecord = await getPokemon(pokemon.url)
  return pokemonRecord 
}))

setPokemonData( _pokemonData)
  }
  return (
    <div>
    {loading ? <h1> Loading...</h1> : (
      <>
<div className = "grid-container">
  {pokemonData.map((pokemon, i ) =>{
    return <Card key = {i} pokemon ={pokemon}/>
  }
  )}
</div>


      </>
    )}
        
    </div>
  )
}

export default App;
