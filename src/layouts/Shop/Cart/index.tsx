import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartState } from "../../../atoms/cart";
import { CartItem } from "./CartItem";
import { Delivery } from "./Delivery";

const Animations = {
    container: {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    },
    item: {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    },
    filterText: {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    },
};

export const Cart = () => {
    const cartItems = useRecoilValue(cartState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cartItems.length) navigate("/");
    }, [cartItems.length]);

    return (
        <div className="h-full w-full bg-catalog-bg p-4">
            {cartItems.length ? (
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <motion.div
                        className="flex h-min w-full flex-col items-start divide-y-2 rounded-lg bg-white py-3 px-4"
                        key="container"
                        variants={Animations.container}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="w-full pb-1 text-xl font-medium">
                            Cart
                        </div>

                        {cartItems.map((product, idx) => (
                            <motion.div
                                className="w-full"
                                variants={Animations.item}
                                key={product.id}
                            >
                                <CartItem product={product} key={product.id} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <Delivery />
                </div>
            ) : null}
        </div>
    );
};

export default Cart;
