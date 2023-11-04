export const metadata = {
  title: "Add Product - Flowmazon",
};
import FormSubmitButon from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function addProduct(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl) {
    throw new Error(`must provide everything in the form`);
  }

  await prisma.product.create({ data: { name, description, imageUrl, price } });
  redirect("/");
}

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  return (
    <div className="mb-3 mt-6 text-lg font-bold">
      <h1>Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-2 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-2 w-full "
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input input-bordered mb-2 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-2 w-full"
        />
        <FormSubmitButon className="btn-block">Add Product</FormSubmitButon>
      </form>
    </div>
  );
};

export default AddProductPage;
