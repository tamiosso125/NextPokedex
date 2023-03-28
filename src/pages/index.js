import React, { useState } from "react";
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Card from '@/components/Card';
export async function getStaticProps() {
  const maxPokemons = 151;
  const api = `https://pokeapi.co/api/v2/pokemon/`;

  const res = await fetch(`${api}/?limit=${maxPokemons}`);

  const p = await res.json();

  p.results.forEach((item, index) => {
    item.id = index + 1;
  });

  const newData = await p.results.map(async ({ url }) => {
    const res2 = await fetch(url);
    const data2 = await res2.json();
    return await data2;
  });
  const p2 = await Promise.all(newData);

  const newPoke = p2.map(({ name, id, types }) => (
    {
      name,
      id,
      types,
    }
  )
  );

  return {
    props: {
      pokemons: {
        newPoke
      }
    },
  };

}


export default function Home({ pokemons }) {
  const [search, setSearch] = useState('');
  const pokemonFilter = pokemons.newPoke.filter(({ name }) => name.startsWith(search))
  if (!pokemons) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <> <div className={styles.title_container}>
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
