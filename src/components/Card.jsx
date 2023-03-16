import styles from '../styles/Card.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ pokemon }) {
  return (
    <div className={styles.card}>
      <Image
        // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(
          '00' + pokemon.id
        ).slice(-3)}.png`}
        width='120'
        height='120'
        alt={pokemon.name}
      />
      <p className={styles.id}>Nº {('000' + pokemon.id).slice(-4)}</p>
      <h3 className={styles.title}>{pokemon.name}</h3>
      <Link href={`/pokemon/${pokemon.id}`} className={styles.btn}>
        Details
      </Link>
    </div>
  );
}
