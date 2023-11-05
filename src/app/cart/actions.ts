"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

const setCartItemQuantity = async (productId: string, quantity: number) => {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);
  if (quantity === 0) {
    //update cart updatedAt automatically
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: { delete: { id: articleInCart.id } },
        },
      });
      // await prisma.cartItem.delete({
      //   where: { id: articleInCart.id },
      // });
    }
  } else {
    if (articleInCart) {
      //update cart updatedAt automatically
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: {
                quantity: quantity,
              },
            },
          },
        },
      });
      // await prisma.cartItem.update({
      //   where: { id: articleInCart.id },
      //   data: { quantity: quantity },
      // });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId: productId,
              quantity: quantity,
            },
          },
        },
      });
      // await prisma.cartItem.create({
      //   data: {
      //     cartId: cart.id,
      //     productId: productId,
      //     quantity: quantity,
      //   },
      // });
    }
  }
  revalidatePath("/cart");
};

export default setCartItemQuantity;
