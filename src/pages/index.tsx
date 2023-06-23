import { Inter } from "next/font/google";
import Seo from "@/components/Seo";
import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Error from "next/error";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  bookList,
  errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (errorCode) {
    <Error statusCode={errorCode} />;
  }

  return (
    <>
      <Seo title="Home" />
      <main>
        <h1>THE NEW YORK TIMES BEST SELLER EXPLORER</h1>
        {bookList.map(book => (
          <Link
            key={book.display_name + book.newest_published_date}
            href={`/list/${book.list_name}`}>
            {book.list_name}
          </Link>
        ))}
      </main>
    </>
  );
}

type BookList = {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: string;
};
export const getServerSideProps: GetServerSideProps<{
  bookList: BookList[];
  errorCode?: number;
}> = async () => {
  const res = await fetch("https://books-api.nomadcoders.workers.dev/lists");
  const json = await res.json();

  if (!res.ok || json.status === "ERROR") {
    return { props: { errorCode: res.status, bookList: json } };
  }
  return { props: { bookList: json.results } };
};
