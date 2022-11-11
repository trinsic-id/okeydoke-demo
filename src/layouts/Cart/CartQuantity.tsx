import { Product } from "../../data/products";
import { useAddItem } from "../../hooks/custom/useAddItem";
import { useDecreaseItem } from "../../hooks/custom/useDecreaseItem";

interface QuantityProps {
    product: Product;
}

export const CartQuantity = ({ product }: QuantityProps) => {
    const add = useAddItem();
    const decrease = useDecreaseItem();

    return (
        <div className="flex flex-row rounded-lg relative bg-transparent">
            <button
                data-action="decrement"
                className=" bg-catalog-bg text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 lg:w-12 rounded-l cursor-pointer outline-none"
                onClick={() => decrease(product)}
            >
                <span className="text-2xl font-thin">{"-"}</span>
            </button>
            <input
                type="number"
                className="focus:outline-none pointer-events-none select-none text-center w-10 lg:w-12 bg-catalog-bg font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                name="custom-input-number"
                disabled
                min={1}
                value={product.qty}
            ></input>
            <button
                data-action="increment"
                className="bg-catalog-bg text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 lg:w-12 rounded-r cursor-pointer"
                onClick={() => add(product, 1)}
            >
                <span className="text-2xl font-thin">+</span>
            </button>
        </div>
    );
};
