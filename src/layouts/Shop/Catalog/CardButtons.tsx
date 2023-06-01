import { useState } from "react";
import { ShoppingCart } from "react-feather";
import { Quantity } from "../../../components/Shop/Quantity";
import { Product } from "../../../data/products";
import { useAddItem } from "../../../hooks/custom/useAddItem";

interface CardButtonProps {
    product: Product;
}

export const CardButtons = ({ product }: CardButtonProps) => {
    const [quantity, setQuantity] = useState(1);
    const addItem = useAddItem();
    return (
        <div className="md:h-18 flex h-12 w-full flex-row items-center gap-4">
            <Quantity quantity={quantity} setQuantity={setQuantity} />
            <button
                className="group flex h-full w-1/2 flex-row place-content-center items-center space-x-3 rounded-lg border-2 border-blue-500 bg-white px-2 py-3 text-blue-500 hover:border-opacity-0 hover:bg-blue-500 hover:text-white"
                onClick={() => {
                    addItem(product, quantity);
                    setQuantity(1);
                }}
            >
                <span>Add to cart</span>
                <ShoppingCart
                    className="stroke-blue-500 group-hover:stroke-white"
                    size={18}
                />
            </button>
        </div>
    );
};
