import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceTag from "./PriceTag";

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      className="card glass w-full transition-shadow hover:shadow-xl"
      href={"/products/" + product.id}
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={600}
          className="h-64  object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {isNew && <div className="badge badge-secondary">New</div>}
        </h2>
        <p>{product.description}</p>
        <PriceTag price={product.price} className="" />
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now!</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
