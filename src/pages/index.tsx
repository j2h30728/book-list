import Seo from "@/components/Seo";
import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Error from "next/error";

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
      <main className="container">
        <h1 className="title">THE NEW YORK TIMES BEST SELLER EXPLORER</h1>
        <div className="list">
          {bookList.map(book => (
            <div
              className="listName border button"
              key={book.display_name + book.newest_published_date}>
              <Link href={`/list/${book.list_name}`}>{book.list_name}</Link>
            </div>
          ))}
        </div>
        <style jsx>{`
          .list {
            padding: 0 15px;
          }
          .listName {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 15px 10px 0;
          }
        `}</style>
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
  const res = await fetch("http://localhost:3000/api/books");
  const json = await res.json();

  if (!res.ok || json.status === "ERROR") {
    return { props: { errorCode: res.status, bookList: json } };
  }
  return { props: { bookList: json.results } };
};
