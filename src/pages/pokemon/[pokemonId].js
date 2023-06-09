import styles from '../../styles/Pokemon.module.css'

import Image from 'next/image'

export async function getServerSideProps({ query }) {
  const { pokemonId } = query;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)

  const data = await res.json()

  const newPoke = {
    name: data.name,
    id: data.id,
    types: data.types,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities,
    stats: data.stats,
    src: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${('00' + data.id).slice(-3)}.png`

  }

  return {
    props: { pokemon: newPoke },
  }

}

export default function Pokemon({ pokemon }) {
  if (!pokemon) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className={styles.pokemon_container}>
      <div className={styles.pokemon_next}>

        <h1 className={styles.title}>{pokemon.name}</h1>
        <Image
          src={pokemon.src}
          width="200"
          height="200"
          alt={pokemon.name}
          priority
        />
        <div>
          <h3>Number:</h3>
          <p>#{('00' + pokemon.id).slice(-3)}</p>
        </div>
        <div>
          <h3>Type:</h3>
          <div className={styles.types_container}>
            {pokemon.types.map((item, index) => (
              <span
                key={index}
                className={`${styles.type} ${styles['type_' + item.type.name]}`}
              >
                {item.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.data_container}>
          <div className={styles.data_height}>
            <h4>Height:</h4>
            <p>{pokemon.height * 10} cm</p>
          </div>
          <div className={styles.data_height}>
            <h4>Weight:</h4>
            <p>{pokemon.weight / 10} kg</p>
          </div>
          <div className={styles.data_weight}>
            <h4>Ability:</h4>
            <p>{pokemon.abilities[0].ability.name}</p>
          </div>
        </div>
      </div>

      <div className={styles.container_stats}>
        <h1>Stats</h1>
        <div className={styles.stats}>
          <p>Hp: {pokemon.stats[0].base_stat}</p>
          <div className={styles.stat_group}>
            <div className='progress_bar' />
          </div>
          <p>Attack: {pokemon.stats[1].base_stat}</p>
          <div className={styles.stat_group}>
            <div className='progress_bar1' />
          </div>
          <p>Defense: {pokemon.stats[2].base_stat}</p>
          <div className={styles.stat_group}>
            <div className='progress_bar2' />

          </div>
          <p>Special Attack: {pokemon.stats[3].base_stat}</p>
          <div className={styles.stat_group}>
            <div className='progress_bar3' />
          </div>
          <p>Special Defense: {pokemon.stats[4].base_stat}</p>
          <div className={styles.stat_group}>
            <div className='progress_bar4' />
          </div>
          <p>Speed: {pokemon.stats[5].base_stat}</p>
          <div className={styles.stat_group}>
            <div className='progress_bar5' />
          </div>
        </div>
      </div>
      <style jsx>{`
        .progress_bar {
          width: ${pokemon.stats[0].base_stat}pt;
          height: 15px;
          background-color: #BC544B;
          border-radius: 10px;
          margin-left: 5%;
          
          
        }
        .progress_bar1 {
          width: ${pokemon.stats[1].base_stat}pt;
          height: 15px;
          background-color: #603808;
          border-radius: 10px;
          margin-left: 5%;
          
        }
        .progress_bar2 {
          width: ${pokemon.stats[2].base_stat}pt;
          height: 15px;
          background-color: #f1c40f;
          border-radius: 10px;
          margin-left: 5%;
          
        }
        .progress_bar3 {
          width: ${pokemon.stats[3].base_stat}pt;
          height: 15px;
          background-color: #464FFF;
          border-radius: 10px;
          margin-left: 5%;
          
        }
        .progress_bar4 {
          width: ${pokemon.stats[4].base_stat}pt;
          height: 15px;
          background-color: #40B144;
          border-radius: 10px;
          margin-left: 5%;
          
        }
        .progress_bar5 {
          width: ${pokemon.stats[5].base_stat}pt;
          height: 15px;
          background-color: #F14AAE;
          border-radius: 10px;
          margin-left: 5%;
          
        }

      `}</style>
    </div>
  )
}