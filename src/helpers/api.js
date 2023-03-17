export const getPokemonData = async (context) => {

  const id = context.params.pokemonId

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json()
  const newPoke = {
    name: data.name,
    id: data.id,
    types: data.types,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities,
    stats: data.stats
  }
  return newPoke
}

export const getPokemonDataName = async (name) => {

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return await res.json()
}

export const searchAllPokemon = async () => {
  const maxPokemons = 151;
  const api = `https://pokeapi.co/api/v2/pokemon/`;

  const res = await fetch(`${api}/?limit=${maxPokemons}`);

  const p = await res.json();

  return p
}


export const searchPokemon = async () => {

  const data = await searchAllPokemon()
  const newData = await data.results.map(async ({ url }) => {
    const res2 = await fetch(url);
    const data2 = await res2.json();
    return await data2;
  });
  const p = await Promise.all(newData);

  return p


}