import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <Link href="/">HOME</Link>
      <Link href="/about">ABOUT</Link>
    </div>
  );
}
