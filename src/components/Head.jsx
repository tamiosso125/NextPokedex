import Head from 'next/head';

export default function HeadPage() {
  return (
    <Head>
      <title>Pokedex</title>
      <meta name='description' content='Pokedex maked with nextjs' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
