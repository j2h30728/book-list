import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Seo from "@/components/Seo";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Seo title="Home" />
      <main>
        <h1>THE NEW YORK TIMES BEST SELLER EXPLORER</h1>
        <Link href="/list/1">TEST 1</Link>
      </main>
    </>
  );
}
