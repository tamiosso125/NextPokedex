import styles from '../../styles/Pokemon.module.css'

import Image from 'next/image'
import { useRouter } from 'next/router'


export const getStaticPaths = async () => {
  const maxPokemons = 151
  const api = `https://pokeapi.co/api/v2/pokemon/`

  const res = await fetch(`${api}/?limit=${maxPokemons}`)

  const data = await res.json()

  const paths = data.results.map((pokemon, index) => {
    return {
      params: { pokemonId: index.toString() },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.pokemonId

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  const data = await res.json()

  return {
    props: { pokemon: data },
  }
}

export default function Pokemon({ pokemon }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Carregando</div>
  }
  return (
    <div className={styles.pokemon_container}>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <Image
        // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${('00' + pokemon.id).slice(-3)}.png`}
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
      <h1>Stats</h1>
      <div className={styles.container_stats}>
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
          width: ${pokemon.stats[0].base_stat}%;
          height: 30px;
          background-color: #BC544B;
          border-radius: 10px;
          margin-left: 5%;
          align-items: center;
          margin-bottom: 10px;
        }
        .progress_bar1 {
          width: ${pokemon.stats[1].base_stat}%;
          height: 30px;
          background-color: #603808;
          border-radius: 10px;
          margin-left: 5%;
          margin-bottom: 10px;
        }
        .progress_bar2 {
          width: ${pokemon.stats[2].base_stat}%;
          height: 30px;
          background-color: #f1c40f;
          border-radius: 10px;
          margin-left: 5%;
          margin-bottom: 10px;
        }
        .progress_bar3 {
          width: ${pokemon.stats[3].base_stat}%;
          height: 30px;
          background-color: #464FFF;
          border-radius: 10px;
          margin-left: 5%;
          margin-bottom: 10px;
        }
        .progress_bar4 {
          width: ${pokemon.stats[4].base_stat}%;
          height: 30px;
          background-color: #40B144;
          border-radius: 10px;
          margin-left: 5%;
          margin-bottom: 10px;
        }
        .progress_bar5 {
          width: ${pokemon.stats[5].base_stat}%;
          height: 30px;
          background-color: #F14AAE;
          border-radius: 10px;
          margin-left: 5%;
          margin-bottom: 10px;
        }

      `}</style>
    </div>
  )
}