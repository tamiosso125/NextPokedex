import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>404</h1>
      <p>MyPokedex only works with First Generation Pokemon</p>
      <Link href='/'>Back</Link>
    </>
  );
}
