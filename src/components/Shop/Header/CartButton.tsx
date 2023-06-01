import { ShoppingBag } from "react-feather";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartTotalState } from "../../../atoms/cart";

export const CartButton = () => {
    const { totalQty } = useRecoilValue(cartTotalState);
    return totalQty ? (
        <Link to={"cart"}>
            <div className="flex flex-row items-center space-x-2">
                <div className="relative">
                    <ShoppingBag size={18} className="stroke-black" />
                    <span
                        className={`items absolute -top-2 -right-2 flex items-center justify-center rounded-full bg-blue-500 ${
                            totalQty === 0 && "opacity-0"
                        }`}
                    >
                        <span className="px-1 text-xs font-light text-white">
                            {totalQty}
                        </span>
                    </span>
                </div>
                <div className="text-md font-semibold text-black">Cart</div>
            </div>
        </Link>
    ) : (
        <div className="flex flex-row items-center space-x-2 opacity-30">
            <div className="relative">
                <ShoppingBag size={18} className="stroke-black" />
                <span
                    className={`items absolute -top-2 -right-2 flex items-center justify-center rounded-full bg-blue-500 ${
                        totalQty === 0 && "opacity-0"
                    }`}
                >
                    <span className="px-1 text-xs font-light text-white">
                        {totalQty}
                    </span>
                </span>
            </div>
            <div className="text-md font-semibold text-black">Cart</div>
        </div>
    );
};
