import Footer from './Footer';
import Head from './Head';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <>
      <Head />
      <NavBar />
      <main className='main-container'>{children}</main>
      <Footer />
    </>
  );
}
