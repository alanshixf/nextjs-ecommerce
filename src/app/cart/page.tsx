import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";
import formatPrice from "@/lib/utils/formatPrice";

const CartPage = async () => {
  const cart = await getCart();
  return (
    <div className="">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((item) => <CartEntry cartItem={item} key={item.id} />)}
      {!cart?.items?.length && <div>Your cart is empty.</div>}
      <div className="flex flex-col sm:items-center md:items-end">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
