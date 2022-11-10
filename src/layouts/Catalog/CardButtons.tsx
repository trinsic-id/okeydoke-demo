import { Listbox, Tab, Transition } from "@headlessui/react";
import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart } from "react-feather";
import { Quantity } from "../../components/Quantity";
import { Product } from "../../data/products";
import { useAddItem } from "../../hooks/custom/useAddItem";

const Quantities = [1, 2, 3, 4, 5];

interface CardButtonProps {
    product: Product;
}

export const CardButtons = ({ product }: CardButtonProps) => {
    const [quantity, setQuantity] = useState(1);
    const addItem = useAddItem();
    return (
        <div className="flex flex-row items-center w-full gap-4 h-12 md:h-18">
            <Quantity quantity={quantity} setQuantity={setQuantity} />
            <button
                className="w-1/2 h-full group bg-white hover:bg-blue-500 border-2 border-blue-500 hover:border-opacity-0 rounded-lg text-blue-500 hover:text-white px-2 py-3 flex flex-row items-center space-x-3 place-content-center"
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
