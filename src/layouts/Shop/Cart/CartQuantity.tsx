import { Product } from "../../../data/products";
import { useAddItem } from "../../../hooks/custom/useAddItem";
import { useDecreaseItem } from "../../../hooks/custom/useDecreaseItem";

interface QuantityProps {
    product: Product;
}

export const CartQuantity = ({ product }: QuantityProps) => {
    const add = useAddItem();
    const decrease = useDecreaseItem();

    return (
        <div className="relative flex flex-row rounded-lg bg-transparent">
            <button
                data-action="decrement"
                className=" h-full w-10 cursor-pointer rounded-l bg-catalog-bg text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700 lg:w-12"
                onClick={() => decrease(product)}
            >
                <span className="text-2xl font-thin">{"-"}</span>
            </button>
            <input
                type="number"
                className="text-md pointer-events-none flex w-10 items-center bg-catalog-bg text-center font-semibold text-black outline-none focus:outline-none lg:w-12"
                name="custom-input-number"
                min={1}
                value={product.qty}
            ></input>
            <button
                data-action="increment"
                className="h-full w-10 cursor-pointer rounded-r bg-catalog-bg text-gray-600 hover:bg-gray-400 hover:text-gray-700 lg:w-12"
                onClick={() => add(product, 1)}
            >
                <span className="text-2xl font-thin">+</span>
            </button>
        </div>
    );
};
