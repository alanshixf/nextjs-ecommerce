import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  searchParams: { page: string };
}
export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  let currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemsCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemsCount - heroItemCount) / pageSize);
  if (currentPage > totalPages) currentPage = totalPages;
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });
  console.log("data fetched");

  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 && (
        <>
          <div className="hero rounded-xl bg-base-200 ">
            <div className="hero-content flex-col md:flex-row">
              <Image
                src={products[0].imageUrl}
                alt={products[0].name}
                width={400}
                height={800}
                className="w-full max-w-sm rounded-lg  shadow-2xl"
                priority
              />

              <div>
                <h1 className="text-5xl font-bold">{products[0].name}</h1>
                <p className="py-6">{products[0].description}</p>
                <Link
                  href={"/products/" + products[0].id}
                  className="btn btn-primary"
                >
                  Check it out
                </Link>
              </div>
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 gap-4 rounded-xl bg-base-200 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(1).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
      {currentPage > 1 && (
        <div className="my-4 grid grid-cols-1 gap-4 rounded-xl bg-base-200 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
