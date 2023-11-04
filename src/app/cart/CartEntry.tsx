"use client";
import { CartItemWithProduct } from "@/lib/db/cart";
import formatPrice from "@/lib/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React, { useTransition } from "react";
import setCartItemQuantity from "./actions";
import { useFormStatus } from "react-dom";
interface CartEntryProps {
  cartItem: CartItemWithProduct;
}
const CartEntry = ({ cartItem: { product, quantity } }: CartEntryProps) => {
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i < 100; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt="product.name"
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              defaultValue={quantity}
              className="select select-bordered w-full max-w-[80px]"
              onChange={(e) => {
                startTransition(async () => {
                  await setCartItemQuantity(product.id, Number(e.target.value));
                });
              }}
            >
              <option value={0}>0(Remove)</option>
              {quantityOptions}
            </select>
            {isPending && <span className="loading loading-spinner " />}
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(product.price * quantity)}d
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default CartEntry;
