export const getPokemonData = async (context) => {

  const id = context.params.pokemonId

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return await res.json()
}


export const searchPokemon = async () => {
  try {
    const maxPokemons = 151;
    const api = `https://pokeapi.co/api/v2/pokemon/`;

    const res = await fetch(`${api}/?limit=${maxPokemons}`);

    const data = await res.json();

    const newData = await data.results.map(async ({ url }) => {

      const res2 = await fetch(url);
      const krl = await res2.json();
      return krl

    });

    return newData

  } catch (error) {
    console.log("error: ", error)
  }
}