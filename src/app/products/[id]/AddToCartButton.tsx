"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { incrementProductQuantity } from "./actions";
import { useState, useTransition } from "react";
interface AddToCartButtonProps {
  productId: string;
}
const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() =>
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          })
        }
      >
        Add to Cart
        <AiOutlineShoppingCart size={20} />
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <div id="toast" className="toast">
          <div className="alert alert-info">
            <span>Added to Cart.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
