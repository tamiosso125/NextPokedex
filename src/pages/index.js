import React, { useState } from "react";
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Card from '@/components/Card';

export async function getStaticProps() {

  const maxPokemons = 151;
  const api = `https://pokeapi.co/api/v2/pokemon/`;

  const res = await fetch(`${api}/?limit=${maxPokemons}`);

  const data = await res.json();


  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results,
    },
  };
}


export default function Home({ pokemons }) {
  const [search, setSearch] = useState('');
  const pokemonFilter = pokemons.filter(({ name }) => name.startsWith(search))

  return (
    <> <div className={styles.title_container}>
      <h1 className={styles.title}>
        My<span>Pokedex</span>
      </h1>
      <Image
        src="/pokeball.png"
        width="50"
        height="50"
        alt="MyPokedex"
        priority='true'
      />
    </div>
      <div className={styles.searchbar_container}>
        <div className={styles.searchbar}>
          <input
            placeholder='Look for a Pokemon'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>
      <div className={styles.pokemon_container}>
        {pokemonFilter.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

    </>
  )
}
