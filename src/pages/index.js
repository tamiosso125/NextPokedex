import React, { useState } from "react";
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Card from '@/components/Card';
import { searchPokemon } from "@/helpers/api";

export async function getStaticProps() {
  try {
    const maxPokemons = 151;
    const api = `https://pokeapi.co/api/v2/pokemon/`;

    const res = await fetch(`${api}/?limit=${maxPokemons}`);

    const data = await res.json();
    const newData = await data.results.map(async ({ url }) => {
      const res2 = await fetch(url);
      const data2 = await res2.json();
      return await data2;
    });
    const p = await Promise.all(newData);
    // console.log(p);

    data.results.forEach(async (item, index) => {
      item.id = index + 1;

    });
    return {
      props: {
        pokemons: {
          data,
          p
        }
      },
    };
  } catch (error) {
    console.log("error: ", error)
  }
}


export default function Home({ pokemons }) {
  console.log(pokemons);
  const [search, setSearch] = useState('');
  const pokemonFilter = pokemons.data.results.filter(({ name }) => name.startsWith(search))

  const porra = async () => {

    const aaaa = await searchPokemon(item.name)
    allTypes.push(aaaa.types[0].type.name)
  }

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
