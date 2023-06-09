import styles from '../styles/Card.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ pokemon }) {
  if (!pokemon) {
    return <div>Carregando</div>;
  }
  return (
    <div
      className={`${styles.card} ${
        styles['type_' + pokemon.types[0].type.name]
      }`}
    >
      <h3 className={styles.title}>{pokemon.name}</h3>
      <Image
        src={pokemon.image}
        width='150'
        height='150'
        alt={pokemon.name}
        className={styles.pokemon_card}
        priority
      />
      <p className={styles.id}>Nº {('000' + pokemon.id).slice(-4)}</p>
      <Link href={`/pokemon/${pokemon.id}`} className={styles.btn}>
        Details
      </Link>
    </div>
  );
}
