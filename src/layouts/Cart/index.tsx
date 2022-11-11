import { useRecoilValue } from "recoil";
import { cartState } from "../../atoms/cart";
import { CartItem } from "./CartItem";

export const Cart = () => {
    const cartItems = useRecoilValue(cartState);
    return (
        <div className="w-full h-full bg-catalog-bg p-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col w-full items-start rounded-lg bg-white py-3 px-4 divide-y-2">
                    {cartItems.map((product, idx) => (
                        <CartItem product={product} key={product.id} />
                    ))}
                </div>
                {/* <div className="flex flex-col w-full items-start rounded-lg bg-white py-3 px-4 divide-y-2">
          <div className="w-full text-xl font-medium pb-1">Checkout</div>
        </div> */}
            </div>
        </div>
    );
};

export default Cart;
