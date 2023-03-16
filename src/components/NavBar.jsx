import Link from 'next/link';

import styles from '../styles/Navbar.module.css';

import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src='/pokeball3.png' width='30' height='30' alt='PokeNext' />
        <h1>MyPokedex</h1>
      </div>
      <ul className={styles.link_items}>
        <li>
          <Link href='/'>Home</Link>
        </li>
      </ul>
    </nav>
  );
}
