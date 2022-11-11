import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartState } from "../../atoms/cart";
import { CartItem } from "./CartItem";
import { Delivery } from "./Delivery";

export const Cart = () => {
    const cartItems = useRecoilValue(cartState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cartItems.length) navigate("/");
    }, [cartItems.length]);

    return (
        <div className="w-full h-full bg-catalog-bg p-4">
            {cartItems.length ? (
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex flex-col w-full items-start rounded-lg bg-white py-3 px-4 divide-y-2">
                        <div className="w-full text-xl font-medium pb-1">
                            Cart
                        </div>
                        {cartItems.map((product, idx) => (
                            <CartItem product={product} key={product.id} />
                        ))}
                    </div>
                    <Delivery />
                </div>
            ) : null}
        </div>
    );
};

export default Cart;
