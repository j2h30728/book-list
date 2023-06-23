import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Error from "next/error";
import Image from "next/image";

export default function List({
  bestSellers,
  errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  console.log(bestSellers);
  return (
    <>
      <h1>{bestSellers.list_name}</h1>
      {bestSellers.books.map(book => (
        <div key={book.amazon_product_url}>
          <Image
            src={book.book_image}
            width={300}
            height={300}
            alt={book.title}
          />
          <span>{book.title}</span>
          <span>{book.author}</span>
          <a href={book.amazon_product_url}>Buy now &rarr;</a>
        </div>
      ))}
    </>
  );
}
type BestSellerList = {
  list_name: string;
  list_name_encoded: string;
  bestsellers_date: string;
  published_date_description: string;
  previous_published_date: string;
  display_name: string;
  books: Book[];
};
type Book = {
  rank: number;
  publisher: string;
  description: string;
  title: string;
  author: string;
  contributor: string;
  book_image: string;
  amazon_product_url: string;
};
export const getServerSideProps: GetServerSideProps<{
  bestSellers: BestSellerList;
  errorCode?: number;
}> = async ({ params }: GetServerSidePropsContext) => {
  const res = await fetch(
    `https://books-api.nomadcoders.workers.dev/list?name=${params?.id}`
  );
  const json = await res.json();
  if (!res.ok || json.status === "ERROR") {
    return { props: { errorCode: res.status, bestSellers: json } };
  }
  return { props: { bestSellers: json.results } };
};
