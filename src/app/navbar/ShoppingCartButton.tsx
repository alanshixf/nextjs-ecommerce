"use client";
import { ShoppingCart } from "@/lib/db/cart";
import formatPrice from "@/lib/utils/formatPrice";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}
const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {
  const closeDropdown = () => {
    const element = document.activeElement as HTMLElement;
    element.blur();
  };
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        <div className="indicator">
          <AiOutlineShoppingCart size={20} />
          <span className="badge indicator-item badge-sm indicator-end">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact 
        z-30 mt-3 w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} Items</span>
          <span className="text-info">
            Subtotal: {formatPrice(cart?.subtotal || 0)}
          </span>
        </div>
        <div className="card-actions">
          <Link
            href={"/cart"}
            className="btn btn-primary btn-block"
            onClick={closeDropdown}
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartButton;
