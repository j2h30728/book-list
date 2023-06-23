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
  return (
    <div className="bestSeller">
      <div className="title-wrapper">
        <span className="title">{bestSellers.list_name.toUpperCase()}</span>
        <span className="title">BOOKS</span>
      </div>
      <div className="books border">
        {bestSellers.books.map(book => (
          <div className="book border" key={book.amazon_product_url}>
            <Image
              src={book.book_image}
              width={300}
              height={450}
              alt={book.title}
            />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <a className="buyBtn border button" href={book.amazon_product_url}>
              Buy now &rarr;
            </a>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .title-wrapper {
            display: flex;
            gap: 30px;
          }
          .title {
            font-size: 50px;
            margin-bottom: 30px;
          }
          .title:first-letter {
            font-size: 70px;
          }
          .bestSeller {
            display: flex;
            flex-direction: column;
            padding: 50px;
          }
          h2 {
            margin: 0 auto;
            margin-bottom: 100px;
          }
          .books {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            width: 100%;
            gap: 70px 30px;
          }
          @media (max-width: 840px) {
            h2 {
              margin-bottom: 50px;
            }
            .books {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          .book {
            display: flex;
            flex-direction: column;
            gap: 10px;
            position: relative;
            padding-bottom: 10px;
            box-shadow: 2px 8px 10px -3px hsla(0, 0%, 0%, 0.3);
          }
          .book :not(img:first-of-type) {
            margin: 0 20px;
          }
          .book h4 {
            font-size: 25px;
          }
          .book p {
            color: #706fd3;
          }
          .buyBtn {
            font-size: 20px;
            width: fit-content;
            padding: 10px;
          }
          .rank {
            border: 1px solid white;
            border-radius: 50%;
            padding: 5px;
            color: white;
            font-size: 20px;
            position: absolute;
            background: rgba(30, 30, 30, 0.5);
            top: -10px;
            left: -10px;
          }
        `}
      </style>
    </div>
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
