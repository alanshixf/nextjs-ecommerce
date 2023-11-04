import AddToCartButton from "./AddToCartButton";
import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    notFound();
  }
  return product;
});

export const generateMetadata = async ({
  params: { id },
}: ProductDetailPageProps): Promise<Metadata> => {
  const product = await getProduct(id);
  return {
    title: product.name + " - Flowmazon ",
    description: product.description,

    openGraph: { images: [{ url: product.imageUrl }] },
  };
};

const ProductDetailPage = async ({
  params: { id },
}: ProductDetailPageProps) => {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={600}
        height={600}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
