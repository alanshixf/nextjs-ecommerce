"use server";

import prisma from "@/lib/db/prisma";
import { createCart, getCart } from "../../../lib/db/cart";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export const incrementProductQuantity = async (productId: string) => {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: articleInCart.id },
            data: {
              quantity: { increment: 1 },
            },
          },
        },
      },
    });
    // await prisma.cartItem.update({
    //   where: { id: articleInCart.id },
    //   data: { quantity: { increment: 1 } },
    // });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId: productId,
            quantity: 1,
          },
        },
      },
    });

    // await prisma.cartItem.create({
    //   data: {
    //     cartId: cart.id,
    //     productId: productId,
    //     quantity: 1,
    //   },
    // });
  }

  revalidatePath("/products/[id]", "page");
};
