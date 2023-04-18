interface QuantityProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const Quantity = ({ quantity, setQuantity }: QuantityProps) => {
    return (
        <div className="relative flex h-full w-1/2 flex-row rounded-lg bg-transparent">
            <button
                data-action="decrement"
                className=" h-full w-20 cursor-pointer rounded-l bg-catalog-bg text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
                onClick={() => setQuantity((val) => Math.max(val - 1, 1))}
            >
                <span className="m-auto text-2xl font-thin">{"-"}</span>
            </button>
            <input
                type="number"
                className="text-md md:text-basecursor-default pointer-events-none flex w-full select-none items-center bg-catalog-bg text-center  font-semibold text-black outline-none  focus:outline-none"
                name="custom-input-number"
                min={1}
                value={quantity}
            ></input>
            <button
                data-action="increment"
                className="h-full w-20 cursor-pointer rounded-r bg-catalog-bg text-gray-600 hover:bg-gray-400 hover:text-gray-700"
                onClick={() => setQuantity((val) => val + 1)}
            >
                <span className="m-auto text-2xl font-thin">+</span>
            </button>
        </div>
    );
};
