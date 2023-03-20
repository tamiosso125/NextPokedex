import Link from "next/link";
import styles from '../styles/Card.module.css';

export default function NotFound() {
  return (
    <div className={styles.pokemon_container}>

      <div className={styles.card}>
        <h1>404</h1>
        <p>MyPokedex only works with First Generation Pokemon or a Valid Pokemon Number</p>
        <Link href='/'>Back</Link>
      </div>
    </div>
  );
}
