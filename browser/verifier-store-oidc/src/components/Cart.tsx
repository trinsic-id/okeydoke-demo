import React from "react";
import CartButtons from "./CartButtons";
import { useRecoilValue } from "recoil";
import { cart, cartState } from "../atoms/atoms";

export const Cart = () => {
  const cartItems = useRecoilValue(cart);
  const { totalCost } = useRecoilValue(cartState);
  return (
    <table className="">
      <thead className="border-b ">
        <tr className="border-b text-left">
          <th className="border-b text-left"></th>
          <th className="border-b text-left">Item</th>
          <th className="border-b text-left">Price</th>
          <th className="border-b text-left">Qty</th>
          <th className="border-b text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr className="border-b hover:bg-gray-200 text-left" key={item.id}>
            <td className="actions">
              <CartButtons item={item} />
            </td>
            <td>{item.id}</td>
            <td>{item.price}</td>
            <td>{item.qty}</td>
            <td>${item.qty * item.price}</td>
          </tr>
        ))}
        {totalCost !== 0 && (
          <tr>
            <td className="text-right" colSpan={4}>
              Total:
            </td>
            <td>${totalCost}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Cart;
